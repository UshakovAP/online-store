import React from 'react';
import BasketListItem from './basketListItem';

const BasketList = ({
    basketItems,
    onBasketItemRemove,
    onIncrement,
    onDecrement,
}) => {
    return (
        <>
            {basketItems.map((basketItem, index) => (
                <BasketListItem
                    key={basketItem._id + '-' + index}
                    basketItem={basketItem}
                    onBasketItemRemove={onBasketItemRemove}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            ))}
        </>
    );
};

export default BasketList;
