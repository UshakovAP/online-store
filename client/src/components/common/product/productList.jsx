import React from 'react';
import ProductListItem from './productListItem';

const ProductList = ({ products }) => {
    return (
        <>
            {products.map(product => (
                <ProductListItem key={product._id} product={product} />
            ))}
        </>
    );
};

export default ProductList;
