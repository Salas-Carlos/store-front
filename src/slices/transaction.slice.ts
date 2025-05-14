import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface TransactionState {
    cardHolder: string;
    numberCard: string;
    cvc: string;
    expMonth: string;
    expYear: string;
    productId: number;
    productPrice: number;
    quantity: number;
    productName: string;
    cardtoken: string;
    customerEmail: string;
    totalValue: number;
}

const initialState: TransactionState = {
    cardHolder: '',
    numberCard: '',
    cvc: '',
    expMonth: '',
    expYear: '',
    productId: 0,
    productPrice: 0,
    totalValue: 0,
    quantity: 1,
    productName: '',
    cardtoken: '',
    customerEmail: '',
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setTransactionInfo: (state, action: PayloadAction<TransactionState>) => {
            return { ...action.payload };
        },
        resetTransactionInfo: () => initialState,
    },
});

export const { setTransactionInfo, resetTransactionInfo } = transactionSlice.actions;
export default transactionSlice.reducer;
