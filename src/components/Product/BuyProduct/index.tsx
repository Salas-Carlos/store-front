import React from 'react'
import Modal from '../../shared/Modal'
import { Products } from '@/model/products/product.entity'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './BuyProduct.module.css';
import useCreateSummaryTransaction, { CardFormData } from '@/hooks/useCreateSummaryTransaction';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useStore';
import { setTransactionInfo } from '@/slices/transaction.slice';
import { useRouter } from 'next/navigation';

type Props = {
    isOpen: boolean,
    setIsOpenModal: () => void,
    product: Products | null,
}


const schema = yup.object({
    numberCard: yup
        .string()
        .required('Número de tarjeta es obligatorio')
        .matches(/^[0-9]{16}$/, 'Debe tener 16 dígitos'),
    cvc: yup
        .string()
        .required('CVC es obligatorio')
        .matches(/^[0-9]{3,4}$/, 'CVC inválido'),
    expMonth: yup
        .string()
        .required('Mes de expiración es obligatorio')
        .matches(/^(0[1-9]|1[0-2])$/, 'Mes inválido'),
    expYear: yup
        .string()
        .required('Año de expiración es obligatorio')
        .matches(/^[0-9]{2}$/, 'Año inválido'),
    cardHolder: yup.string().required('Nombre del titular es obligatorio'),
    quantity: yup
        .number().required('Cantidad es obligatoria')
        .min(1, 'La cantidad debe ser al menos 1'),
    customerEmail: yup.string()
        .email('Correo electrónico inválido').required('Correo electrónico es obligatorio'),
});

const BuyProduct = ({ isOpen, setIsOpenModal, product }: Props) => {

    const router = useRouter();

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CardFormData>({
        resolver: yupResolver(schema),
    });

    const { onSubmit, transaction, loading } = useCreateSummaryTransaction(product);

    useEffect(() => {
        if (transaction) {
            dispatch(setTransactionInfo({
                ...transaction, productId: product?.id || 0,
                productPrice: product?.price || 0,
                productName: product?.name || '',
                cardtoken: transaction.cardToken,
                customerEmail: transaction.customerEmail,
                totalValue: transaction.totalValue
            }));
            router.push('/summary');
        }
    }, [transaction]);

    return (
        <Modal isOpen={isOpen} onClose={setIsOpenModal} >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.title}>Formulario de Pago</h2>

                <div className={styles.field}>
                    <label>Número de tarjeta</label>
                    <input type="text" {...register('numberCard')} />
                    <span>{errors.numberCard?.message}</span>
                </div>

                <div className={styles.double}>
                    <div className={styles.field}>
                        <label>Mes (MM)</label>
                        <input type="text" {...register('expMonth')} />
                        <span>{errors.expMonth?.message}</span>
                    </div>
                    <div className={styles.field}>
                        <label>Año (YY)</label>
                        <input type="text" {...register('expYear')} />
                        <span>{errors.expYear?.message}</span>
                    </div>
                </div>

                <div className={styles.field}>
                    <label>CVC</label>
                    <input type="text" {...register('cvc')} />
                    <span>{errors.cvc?.message}</span>
                </div>

                <div className={styles.field}>
                    <label>Nombre del titular</label>
                    <input type="text" {...register('cardHolder')} />
                    <span>{errors.cardHolder?.message}</span>
                </div>

                <div className={styles.field}>
                    <label>Correo</label>
                    <input type="text" {...register('customerEmail')} />
                    <span>{errors.customerEmail?.message}</span>
                </div>

                <div className={styles.field}>
                    <label>Cantidad</label>
                    <input type="number" {...register('quantity')} />
                    <span>{errors.quantity?.message}</span>
                </div>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? '⏳ Procesando...' : 'Generar'}
                </button>
            </form>
        </Modal>
    )
}

export default BuyProduct