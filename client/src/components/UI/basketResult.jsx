import React from 'react';
import TheButton from '../common/controls/theButton';

const BasketResult = ({ filteredBasketItems, onCheckout }) => {
    const handleCountCalculation = () => {
        let count = 0;

        filteredBasketItems &&
            filteredBasketItems.forEach(basketItem => {
                count += basketItem.countToBuy;
            });

        return count;
    };

    const handlePriceCalculation = () => {
        let price = 0;

        filteredBasketItems &&
            filteredBasketItems.forEach(basketItem => {
                price += basketItem.priceToBuy;
            });

        return price;
    };

    const countToBuy = handleCountCalculation();
    const priceToBuy = handlePriceCalculation();

    return (
        <div className="d-flex flex-column p-3 border rounded">
            <div className="mb-5">
                Итого: {countToBuy ? countToBuy + ' шт.' : '-'}
            </div>

            <div className="mb-5">
                Итоговая сумма:{' '}
                {priceToBuy ? priceToBuy.toLocaleString() + ' ₽' : '-'}
            </div>

            <TheButton
                className="btn btn-primary"
                type="button"
                onClick={() => onCheckout(filteredBasketItems)}
                disabled={countToBuy ? false : true}
                text="Оформить заказ"
            />
        </div>
    );
};

export default BasketResult;
