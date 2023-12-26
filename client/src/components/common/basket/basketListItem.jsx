import React from 'react';
import { useBasket } from '../../../hooks/useBasket';
import Counter from '../counter';
import TheButton from '../controls/theButton';

const BasketListItem = ({
    basketItem,
    onBasketItemRemove,
    onIncrement,
    onDecrement,
}) => {
    const { updateBasketItem } = useBasket();

    const handleChange = ({ target }) => {
        const regExp = /^[0-9\b]+$/;

        if (
            basketItem.countToBuy === '' ||
            regExp.test(Number(basketItem.countToBuy))
        ) {
            updateBasketItem({
                ...basketItem,
                countToBuy: Number(target.value),
                priceToBuy: Number(target.value) * Number(basketItem.price),
            });
        }
    };

    return (
        <div className="container mb-3 p-3 border rounded position-relative">
            <div className="row gy-3">
                <div className="col-lg-7 d-flex">
                    <img
                        style={{ width: 50, height: 50, marginRight: 50 }}
                        src={basketItem.photo}
                        alt="Фото товара"
                    />

                    <div>
                        <div>ID товара: {basketItem.productId}</div>
                        <b>{basketItem.name}</b>
                    </div>
                </div>

                <div className="col-lg-3 d-flex flex-column justify-content-center">
                    <Counter
                        onIncrement={() => onIncrement(basketItem._id)}
                        itemCount={
                            basketItem.countToBuy === 0
                                ? ''
                                : basketItem.countToBuy
                        }
                        onChange={handleChange}
                        onDecrement={() => onDecrement(basketItem._id)}
                    />
                </div>

                <div className="col-lg-2 d-flex justify-content-center align-items-center">
                    {basketItem.priceToBuy.toLocaleString()} ₽
                </div>
            </div>

            <TheButton
                className="btn btn-link text-danger m-1 position-absolute top-0 end-0 z-1"
                type="button"
                onClick={() =>
                    onBasketItemRemove(basketItem._id, basketItem.name)
                }
                text={<i className="bi bi-x-circle-fill"></i>}
            />
        </div>
    );
};

export default BasketListItem;
