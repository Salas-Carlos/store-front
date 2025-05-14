import { ProductsReponse } from "./products.response";

export interface ProductsRepository {
    getProducts(): Promise<ProductsReponse>
}