import { TransactionsRepository } from '@/model/transactions/transactions.repository';
import { ProductsRepository } from '../../../model/products/products.repository';


export class GetTransactionByIdUseCase {
    constructor(private readonly transactionsService: TransactionsRepository) { }

    async apply(id: number) {
        return this.transactionsService.getById(id);
    }
}