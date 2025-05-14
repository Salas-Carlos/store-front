import { Client } from "../client";
import { TransactionsRepository } from "@/model/transactions/transactions.repository";
import { CreateTransactionCommand } from "@/model/transactions/commands/create-transaction.command";
import { Transactions } from "@/model/transactions/transaction.entity";



const create = async (createTransactionCommand: CreateTransactionCommand): Promise<Transactions> => {
    const url = 'transaction';
    const response = await Client.call<Transactions>({ url, method: 'post', data: createTransactionCommand });
    return {
        ...response.data
    }
}

const getById = async (id: number): Promise<Transactions> => {
    const url = `transaction/${id}`;
    const response = await Client.call<Transactions>({ url, method: 'get' });
    return {
        ...response.data
    }
}

export const transactionsService: TransactionsRepository = {
    create,
    getById
}