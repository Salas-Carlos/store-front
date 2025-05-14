import { productsService } from '@/adapters/out/http/back/services/products.service';
import { GetProductsUseCase } from '@/domain/usecase/products/get-products.usecase';
import { Products } from '@/model/products/product.entity';
import { useCallback, useEffect, useState } from 'react'

interface ProductsData {
    loading: boolean;
    error: string | null;
    products: null | Products[];
}

const useGetProducts = () => {

    const [productsData, setProductsData] = useState<ProductsData>({ loading: true, error: null, products: null });

    const fetchProducts = useCallback(
        async () => {
            try {
                const getProductsUseCase = new GetProductsUseCase(productsService);

                const productsResponse = await getProductsUseCase.apply();

                setProductsData({ loading: false, error: null, products: productsResponse.products })

            } catch (error) {
                setProductsData({ loading: false, error: error instanceof Error ? error.message : String(error.message), products: null })
            }
        },
        [],
    )


    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return {
        ...productsData
    }
}

export default useGetProducts