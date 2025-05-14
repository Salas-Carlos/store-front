import { CreateTransactionCommand } from '@/model/transactions/commands/create-transaction.command';
import { TransactionsRepository } from '@/model/transactions/transactions.repository';


export class CreateTransactionUseCase {
    constructor(private readonly transactionsService: TransactionsRepository) { }

    async apply(body: CreateTransactionCommand) {
        return this.transactionsService.create(body);
    }
}