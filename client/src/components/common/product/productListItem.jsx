import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
    return (
        <div className="border rounded mb-3 p-3">
            <div className="row">
                <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                    <img
                        className="d-block w-50 h-100"
                        src={product.photo}
                        alt="Фото товара"
                    />
                </div>

                <div className="col-lg-4 d-flex flex-column justify-content-center">
                    <b>{product.name}</b>
                    <div>ID товара: {product._id}</div>
                    <div>{product.price.toLocaleString()} ₽</div>
                </div>

                <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                    <Link className="btn btn-primary" to={`/${product._id}`}>
                        Открыть карточку
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;
