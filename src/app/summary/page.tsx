
'use client';
import { useSelector } from "react-redux";
import styles from "./Summary.module.css";
import { RootState } from "../../store";
import usePayProduct from "@/hooks/usePayProduct";
import { useEffect } from "react";
import { useRouter } from "next/navigation";




export default function Summary() {
    const transaction = useSelector((state: RootState) => state.transaction);

    const router = useRouter();

    const { onSubmit, transaction: transactionData, loading } = usePayProduct();

    const handlePayment = () => {

        onSubmit({
            cardToken: transaction.cardtoken,
            quantity: transaction.quantity,
            productId: transaction.productId,
            customerEmail: transaction.customerEmail,
            totalValue: transaction.totalValue
        })

    };

    useEffect(() => {
        if (transactionData) {
            router.push('/Transaction/' + transactionData.id);
        }
    }, [transactionData])


    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>💳 Resumen de la Transacción</h2>
                <div className={styles.info}>
                    <p><span>🛍️ Producto:</span> {transaction.productName}</p>
                    <p><span>💰 Precio:</span> ${transaction.productPrice.toFixed(2)}</p>
                    <p><span>📦 Cantidad:</span> {transaction.quantity}</p>
                    <p><span>📧 Correo del Cliente:</span> {transaction.customerEmail}</p>
                    <p><span>💵 Total a Pagar:</span> ${transaction.totalValue.toFixed(2)}</p>
                    <p><span>👤 Titular:</span> {transaction.cardHolder}</p>
                    <p><span>💳 Tarjeta:</span> {transaction.numberCard}</p>
                    <p><span>🔒 CVC:</span> {transaction.cvc}</p>
                    <p><span>📅 Vence:</span> {transaction.expMonth}/{transaction.expYear}</p>
                    <p><span>🧾 Token:</span> {transaction.cardtoken}</p>
                </div>
                <button className={styles.button} onClick={handlePayment} disabled={loading}>
                    {loading ? '⏳ Procesando...' : '💸 Pagar ahora'}
                </button>
            </div>
        </div>
    );
}
