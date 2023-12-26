import React from 'react';
import { useProduct } from '../../../hooks/useProducts';
import { useParams } from 'react-router-dom';
import ProductCard from './productCard';
import Products from '../../layouts/products';

const ProductUnit = () => {
    const { products } = useProduct();
    let { productId } = useParams();
    const currentProduct = products.find(product => product._id === productId);

    return (
        <>
            {currentProduct ? (
                <ProductCard productId={productId} />
            ) : (
                <Products />
            )}
        </>
    );
};

export default ProductUnit;
