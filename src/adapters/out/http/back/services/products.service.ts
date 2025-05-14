import { ProductsRepository } from "@/model/products/products.repository";
import { Client } from "../client";
import { ProductsReponse } from "@/model/products/products.response";
import { Products } from "@/model/products/product.entity";



const getProducts = async (): Promise<ProductsReponse> => {
    const url = 'products';
    const productsItems = await Client.call<{
        products: Products[]
    }>({ url, method: 'get' })
    return {
        products: productsItems.data.products
    }
}

export const productsService: ProductsRepository = {
    getProducts
}