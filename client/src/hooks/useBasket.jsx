import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import basketService from '../services/basket.service';
const BasketContext = React.createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [basket, setBasket] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        getBasketItems();
    }, [basket]);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };

    const createBasketItem = async (product, countToBuy, priceToBuy) => {
        const basketItem = {
            ...product,
            userId: currentUser._id,
            productId: product._id,
            countToBuy: countToBuy,
            priceToBuy: priceToBuy,
        };

        try {
            const { content } = await basketService.createBasketItem(
                basketItem
            );
            setBasket(prevState => [...(prevState || []), content]);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getBasketItems = async () => {
        try {
            const { content } = await basketService.getBasketItems(currentUser);
            setBasket(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeBasketItem = async id => {
        try {
            const { content } = await basketService.removeBasketItem(id);

            if (content === null) {
                setBasket(prevState =>
                    (prevState || []).filter(
                        basketItem => basketItem._id !== id
                    )
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    };

    const removeAllBasketItems = async id => {
        try {
            const { content } = await basketService.removeBasketItem(id);

            if (content === null) {
                setBasket(prevState =>
                    (prevState || []).filter(
                        basketItem => basketItem.userId !== currentUser._id
                    )
                );
            }
        } catch (error) {
            errorCatcher(error);
        }
    };

    const updateBasketItem = async data => {
        try {
            const { content } = await basketService.updateBasketItem(data);

            if (!basket) {
                setBasket(prevState => [...prevState, content]);
            }
        } catch (error) {
            errorCatcher(error);
        }
    };

    return (
        <BasketContext.Provider
            value={{
                isLoading,
                basket,
                createBasketItem,
                getBasketItems,
                removeBasketItem,
                removeAllBasketItems,
                updateBasketItem,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};
