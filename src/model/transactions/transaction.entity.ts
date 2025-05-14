import { Products } from "../products/product.entity";
import { StatusTransactionEnum } from "./enums/status-transaction.enum";

export type Transactions = {
    id: number;

    totalValue: number;
    reference: string;
    customerEmail: string;
    status: StatusTransactionEnum;
    quantity: number;
    product: Products;
    transactionId: string;

    createdAt: Date;
    updatedAt: Date;
}