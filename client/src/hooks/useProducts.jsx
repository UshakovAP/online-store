import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import productService from '../services/product.service';
import Loader from '../components/common/loader';

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts();
    }, [products]);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };

    const getProducts = async () => {
        try {
            const { content } = await productService.get();
            setProducts(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getProductById = productId => {
        return products.find(product => product._id === productId);
    };

    const updateProductData = async data => {
        try {
            const { content } = await productService.update(data);
            setProducts(prevState => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const createProductData = async data => {
        try {
            const { content } = await productService.create(data);
            setProducts(prevState => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const removeProductData = async id => {
        try {
            const { content } = await productService.remove(id);

            if (content === null) {
                setProducts(prevState =>
                    prevState.filter(product => product._id !== id)
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                getProductById,
                updateProductData,
                createProductData,
                removeProductData,
            }}
        >
            {!isLoading ? (
                children
            ) : (
                <Loader style={{ minHeight: 75 + 'vh' }} />
            )}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
