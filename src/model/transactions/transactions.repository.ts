import { CreateTransactionCommand } from "./commands/create-transaction.command";
import { Transactions } from "./transaction.entity";


export interface TransactionsRepository {
    create(createTransactionCommand: CreateTransactionCommand): Promise<Transactions>,
    getById(id: number): Promise<Transactions>,
}