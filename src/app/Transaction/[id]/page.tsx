'use client'
import useGetTransactionById from '@/hooks/useGetTransactionById'
import React from 'react';
import styles from './Transaction.module.css';
import { formatDate } from '@/utils/format-date.util';

type Props = {
    params: Promise<{ id: number }>
}

const Page = ({ params }: Props) => {
    const { id } = React.use(params);

    const { transaction } = useGetTransactionById({ id });



    const statusColor = transaction?.status === "APPROVED" ? "#16a34a" : transaction?.status === "PENDING" ? "#facc15" : "#dc2626";


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>🧾 Detalle de Transacción</h2>

            <div className={styles.card}>
                <div className={styles.row}>
                    <span>ID Transacción:</span>
                    <span>{transaction?.transactionId}</span>
                </div>

                <div className={styles.row}>
                    <span>Referencia:</span>
                    <span>{transaction?.reference}</span>
                </div>

                <div className={styles.row}>
                    <span>Cliente:</span>
                    <span>{transaction?.customerEmail}</span>
                </div>

                <div className={styles.row}>
                    <span>Producto:</span>
                    <span>{transaction?.product.name}</span>
                </div>

                <div className={styles.row}>
                    <span>Cantidad:</span>
                    <span>{transaction?.quantity}</span>
                </div>

                <div className={styles.row}>
                    <span>Total:</span>
                    <span>${transaction?.totalValue.toLocaleString()}</span>
                </div>

                <div className={styles.row}>
                    <span>Fecha:</span>
                    <span>{formatDate(transaction?.createdAt)}</span>
                </div>

                <div className={styles.row}>
                    <span>Estado:</span>
                    <span style={{ color: statusColor, fontWeight: "bold" }}>{transaction?.status}</span>
                </div>
            </div>
        </div>
    )
}

export default Page