

export type CreateTransactionCommand = {
    quantity: number
    productId: number;
    totalValue: number;
    customerEmail: string
    cardToken: string;
}