import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../hooks/useBasket';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import TheInput from '../common/controls/theInput';
import BasketList from '../common/basket/basketList';
import ErrorMessage from '../common/errorMessage';
import BasketResult from '../UI/basketResult';

const Basket = () => {
    const navigate = useNavigate();
    const {
        isLoading: basketLoading,
        basket,
        updateBasketItem,
        removeBasketItem,
        removeAllBasketItems,
    } = useBasket();
    const { currentUser } = useAuth();
    const [basketItemsSearch, setBasketItemsSearch] = useState('');

    const currentBasketItems =
        basket &&
        basket.filter(basketItem => basketItem.userId === currentUser._id);

    const filteredBasketItems =
        currentBasketItems &&
        currentBasketItems.filter(basketItem =>
            basketItem.name
                .toLowerCase()
                .includes(basketItemsSearch.toLowerCase())
        );

    const handleBasketItemsSearch = ({ target }) => {
        setBasketItemsSearch(target.value);
    };

    const handleBasketItemRemove = (basketItemId, basketItemName) => {
        removeBasketItem(basketItemId);
        toast.error(`Товар "${basketItemName}" удален из корзины!`);
    };

    const handleIncrement = async basketItemId => {
        const currentBasketItem = filteredBasketItems.find(
            basketItem => basketItem._id === basketItemId
        );
        await updateBasketItem({
            ...currentBasketItem,
            countToBuy: currentBasketItem.countToBuy + 1,
            priceToBuy:
                currentBasketItem.price * (currentBasketItem.countToBuy + 1),
        });
    };

    const handleDecrement = async basketItemId => {
        const currentBasketItem = filteredBasketItems.find(
            basketItem => basketItem._id === basketItemId
        );
        await updateBasketItem({
            ...currentBasketItem,
            countToBuy: currentBasketItem.countToBuy - 1,
            priceToBuy: currentBasketItem.priceToBuy - currentBasketItem.price,
        });
    };

    const handleCheckout = filteredBasketItems => {
        filteredBasketItems.forEach(basketItem => {
            removeAllBasketItems(basketItem._id);
        });
        toast.info('Заказ оформлен!');
        navigate('/');
    };

    return (
        <>
            {!basketLoading && (
                <div className="container">
                    <div className="input-group mb-5">
                        <TheInput
                            type="text"
                            name="productsSearch"
                            placeholder="Поиск по названию товара..."
                            value={basketItemsSearch}
                            onChange={handleBasketItemsSearch}
                        />
                    </div>

                    <h2 className="mb-3">Корзина</h2>

                    <div className="row gy-3 pb-3">
                        <div className="col-lg-9">
                            {filteredBasketItems &&
                            filteredBasketItems.length ? (
                                <BasketList
                                    basketItems={filteredBasketItems}
                                    onBasketItemRemove={handleBasketItemRemove}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                />
                            ) : (
                                <ErrorMessage text="Корзина пуста!" />
                            )}
                        </div>

                        <div className="col-lg-3">
                            <BasketResult
                                filteredBasketItems={filteredBasketItems}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Basket;
