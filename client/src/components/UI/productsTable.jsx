import React from 'react';
import { Link } from 'react-router-dom';
import TheButton from '../common/controls/theButton';
import ErrorMessage from '../common/errorMessage';

const ProductsTable = ({ filteredProducts, products, onRemoveProduct }) => {
    return (
        <>
            {filteredProducts.length ? (
                <div className="p-3 border rounded">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">ID</th>
                                    <th scope="col">Наименование</th>
                                    <th scope="col">Категория</th>
                                    <th scope="col">Стоимость</th>
                                    <th scope="col">Количество</th>
                                    <th scope="col">Фото</th>
                                    <th scope="col">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr
                                        key={product._id}
                                        className="text-center"
                                    >
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            {product.price.toLocaleString()} ₽
                                        </td>
                                        <td>{product.count}</td>
                                        <td className="position-relative">
                                            <img
                                                className="d-block w-100 h-100 position-absolute top-50 start-50 z-1 translate-middle"
                                                src={product.photo}
                                                alt="Фото товара"
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <Link
                                                    className="btn btn-outline-primary m-1"
                                                    to={`/admin/${product._id}`}
                                                >
                                                    <i className="bi bi-pen-fill"></i>
                                                </Link>
                                                <TheButton
                                                    className="btn btn-outline-danger m-1"
                                                    type="button"
                                                    onClick={() =>
                                                        onRemoveProduct(
                                                            product._id,
                                                            product.name
                                                        )
                                                    }
                                                    text={
                                                        <i className="bi bi-x-circle-fill"></i>
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <ErrorMessage text="Товары не найдены!" />
            )}
        </>
    );
};

export default ProductsTable;
