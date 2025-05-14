import { ProductsRepository } from '../../../model/products/products.repository';


export class GetProductsUseCase {
    constructor(private readonly productsService: ProductsRepository) { }

    async apply() {
        return this.productsService.getProducts();
    }
}