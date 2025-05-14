import { cardsService } from "@/adapters/out/http/back/services/cards.service";
import { CreateCardtokenUseCase } from "@/domain/usecase/cards/create-card-token.usecase";
import { Products } from "@/model/products/product.entity";
import { useState } from "react";


export type CardFormData = {
    numberCard: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
    quantity: number;
    customerEmail: string;
};


type TransactionData = {
    loading: boolean;
    error: string | null;
    transaction: {

        cardToken: string;
        numberCard: string;
        cvc: string;
        expMonth: string;
        expYear: string;
        cardHolder: string;
        quantity: number;
        customerEmail: string;
        totalValue: number;

    } | null;
};

const useCreateSummaryTransaction = (product: Products | null) => {
    const [transactionsData, setTransactionsData] = useState<TransactionData | null>({ loading: false, error: null, transaction: null });

    const onSubmit = async (formData: CardFormData) => {
        try {
            const createCardToken = new CreateCardtokenUseCase(cardsService);
            setTransactionsData({ loading: true, error: null, transaction: null })
            const { quantity, customerEmail, ...rest } = formData;
            const response = await createCardToken.apply(rest);
            setTransactionsData({ loading: false, error: null, transaction: { ...formData, cardToken: response.cardToken, totalValue: (product?.price || 0) * (quantity || 1) } })

        } catch (error) {
            setTransactionsData({ loading: false, error: error instanceof Error ? error.message : String(error.message), transaction: null })
        }
    }
    return {
        onSubmit,
        ...transactionsData
    }
}

export default useCreateSummaryTransaction