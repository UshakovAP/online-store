import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useBasket } from '../../../hooks/useBasket';
import { useProduct } from '../../../hooks/useProducts';
import Counter from '../counter';
import TheButton from '../controls/theButton';
import Loader from '../loader';
import { toast } from 'react-toastify';

const ProductCard = ({ productId }) => {
    const { currentUser } = useAuth();
    const { isLoading: basketLoading, basket, createBasketItem } = useBasket();
    const { getProductById } = useProduct();
    const product = getProductById(productId);
    const [productCount, setProductCount] = useState(1);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const currentBasket =
        basket &&
        basket.filter(basketItem => basketItem.productId === productId);
    const isCurrentBasketItem =
        currentUser &&
        currentBasket.find(basketItem => basketItem.userId === currentUser._id);
    const isCurrentUser =
        currentBasket &&
        currentUser &&
        currentBasket.find(product => product.userId === currentUser._id);

    const categoryCheck = () => {
        switch (product.category) {
            case 'процессоры':
                return 'Процессор';
            case 'материнские платы':
                return 'Материнская плата';
            case 'видеокарты':
                return 'Видеокарта';
            case 'HDD':
                return 'Жесткий диск';
            case 'SSD':
                return 'Накопитель';
            case 'оперативная память':
                return 'Оперативная память';
            case 'корпуса':
                return 'Корпус';
            case 'блоки питания':
                return 'Блок питания';
            case 'системы охлаждения':
                return 'Кулер';
            case 'мониторы':
                return 'Монитор';
        }
    };

    const handleIncrement = () => {
        setProductCount(productCount + 1);
    };

    const handleChange = ({ target }) => {
        const regExp = /^[0-9\b]+$/;

        if (target.value === '' || regExp.test(Number(target.value))) {
            setProductCount(Number(target.value));
        }
    };

    const handleDecrement = () => {
        setProductCount(productCount - 1);
        if (productCount === 1) setProductCount(1);
    };

    const handlePriceCalculation = (price, count) => {
        return price * count;
    };

    const handleProductBuy = () => {
        createBasketItem(
            product,
            productCount,
            handlePriceCalculation(product.price, productCount)
        );
        setIsProductAdded(true);
        toast.success(`Товар "${product.name}" добавлен в корзину!`);
    };

    if (product) {
        return (
            <div
                className="d-flex flex-column justify-content-center py-5 px-3"
                style={{ minHeight: 75 + 'vh' }}
            >
                <div className="container py-5 border rounded position-relative">
                    <div className="row gy-3">
                        <div className="col-lg-4 d-flex flex-column justify-content-center px-5">
                            <img
                                className="d-block w-100 h-100"
                                src={product.photo}
                                alt="Фото товара"
                            />
                        </div>

                        <div className="col-lg-4 d-flex flex-column justify-content-center px-5">
                            <b>{categoryCheck() + ' ' + product.name}</b>
                            <br />
                            {currentUser && (
                                <div>
                                    {!basketLoading ? (
                                        <div>
                                            {!isCurrentBasketItem && (
                                                <div className="d-flex align-items-center">
                                                    <div>Количество:</div>
                                                    <Counter
                                                        onIncrement={
                                                            handleIncrement
                                                        }
                                                        itemCount={
                                                            productCount === 0
                                                                ? ''
                                                                : productCount
                                                        }
                                                        onChange={handleChange}
                                                        onDecrement={
                                                            handleDecrement
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Loader
                                            style={{ marginTop: 3 + 'px' }}
                                        />
                                    )}
                                </div>
                            )}
                            <br />
                            <div>{product.price.toLocaleString()} ₽</div>
                        </div>

                        {currentUser ? (
                            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                                {!basketLoading ? (
                                    <div>
                                        {isProductAdded || isCurrentUser ? (
                                            <TheButton
                                                className="btn btn-primary"
                                                type="button"
                                                disabled={true}
                                                text="Товар в корзине"
                                            />
                                        ) : (
                                            <TheButton
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={handleProductBuy}
                                                disabled={
                                                    productCount === 0
                                                        ? true
                                                        : false
                                                }
                                                text="Добавить в корзину"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <Loader style={{ marginTop: 3 + 'px' }} />
                                )}
                            </div>
                        ) : (
                            <b className="col-lg-4 d-flex flex-column justify-content-center align-items-center text-center">
                                Войдите или зарегистрируйтесь,
                                <br />
                                чтобы делать покупки!
                            </b>
                        )}
                    </div>

                    <div className="p-3 position-absolute bottom-0 end-0 z-1">
                        <b>ID товара:</b> {productId}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader style={{ minHeight: 75 + 'vh' }} />;
    }
};

export default ProductCard;
