
'use client';
import styles from "./Tienda.module.css";
import { useState } from "react";
import BuyProduct from "@/components/Product/BuyProduct";
import useGetProducts from "@/hooks/useGetProducts";
import { Products } from "@/model/products/product.entity";




export default function Home() {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [productSelected, setProductSelected] = useState<Products | null>(null);

    const { products } = useGetProducts();

    const handleBuy = (product: Products) => {
        setProductSelected(product)
        setIsOpenModal(true);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tienda</h1>
            <div className={styles.grid}>
                {products?.map((product, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.price}>Precio: ${product.price.toLocaleString()}</p>
                            <p className={styles.stock}>Stock: {product.stock}</p>
                        </div>
                        <button
                            className={styles.button}
                            onClick={() => handleBuy(product)}
                        >
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
            <BuyProduct product={productSelected} isOpen={isOpenModal} setIsOpenModal={() => setIsOpenModal(false)} />
        </div>
    );
}
