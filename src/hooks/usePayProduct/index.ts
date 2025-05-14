import { transactionsService } from "@/adapters/out/http/back/services/transaction.service";
import { CreateTransactionUseCase } from "@/domain/usecase/transactions/create-transaction.usecase";
import { CreateTransactionCommand } from "@/model/transactions/commands/create-transaction.command";
import { Transactions } from "@/model/transactions/transaction.entity";
import { useState } from "react";


export type CardFormData = {
    numberCard: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    cardHolder: string;
    quantity: number;
};


type TransactionData = {
    loading: boolean;
    error: string | null;
    transaction: Transactions | null;
};

const usePayProduct = () => {
    const [transactionsData, setTransactionsData] = useState<TransactionData | null>({ loading: false, error: null, transaction: null });

    const onSubmit = async (formData: CreateTransactionCommand) => {
        try {
            const createTransactionUsecase = new CreateTransactionUseCase(transactionsService);
            setTransactionsData({ loading: true, error: null, transaction: null })
            const response = await createTransactionUsecase.apply(formData);
            setTransactionsData({ loading: false, error: null, transaction: response })

        } catch (error) {
            setTransactionsData({ loading: false, error: error instanceof Error ? error.message : String(error.message), transaction: null })
        }
    }
    return {
        onSubmit,
        ...transactionsData
    }
}

export default usePayProduct;