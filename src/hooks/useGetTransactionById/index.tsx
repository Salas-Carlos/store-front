import { productsService } from '@/adapters/out/http/back/services/products.service';
import { transactionsService } from '@/adapters/out/http/back/services/transaction.service';
import { GetProductsUseCase } from '@/domain/usecase/products/get-products.usecase';
import { GetTransactionByIdUseCase } from '@/domain/usecase/transactions/get-transaction-by-id.usecase';
import { Products } from '@/model/products/product.entity';
import { Transactions } from '@/model/transactions/transaction.entity';
import { useCallback, useEffect, useState } from 'react'

interface ProductsData {
    loading: boolean;
    error: string | null;
    transaction: Transactions | null;
}

type Props = {
    id: number;
}
const useGetTransactionById = ({ id }: Props) => {

    const [productsData, setProductsData] = useState<ProductsData>({ loading: true, error: null, transaction: null });

    const fetchTransactionById = useCallback(
        async () => {
            try {
                const getTransactionByIdUseCase = new GetTransactionByIdUseCase(transactionsService);

                const transaction = await getTransactionByIdUseCase.apply(id);


                setProductsData({ loading: false, error: null, transaction, })

            } catch (error) {
                setProductsData({ loading: false, error: error instanceof Error ? error.message : String(error.message), transaction: null })
            }
        },
        [id],
    )


    useEffect(() => {
        fetchTransactionById()
    }, [fetchTransactionById])

    return {
        ...productsData
    }
}

export default useGetTransactionById