import React, { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProducts';
import { useCategory } from '../../hooks/useCategories';
import { paginate } from '../../utils/paginate';
import { validator } from '../../utils/validator';
import { toast } from 'react-toastify';
import AddProductForm from '../UI/addProductForm';
import TheInput from '../common/controls/theInput';
import ProductsTable from '../UI/productsTable';
import Pagination from '../common/pagination';

const AdminPanel = () => {
    const [data, setData] = useState({
        name: '',
        price: '',
        photo: '',
        category: '',
        count: '',
    });
    const { products, createProductData, removeProductData } = useProduct();
    const [productsCopy, setProductsCopy] = useState(products);
    const [productsSearch, setProductsSearch] = useState('');
    const { categories } = useCategory();
    const categoriesList = categories.map(category => ({
        _id: category._id,
        name: category.name,
    }));
    const [currentPage, setCurrentPage] = useState(1);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setProductsCopy(products);
    }, [products]);

    useEffect(() => {
        setCurrentPage(1);
    }, [productsSearch]);

    useEffect(() => {
        validate();
    }, [data]);

    const filteredProducts = productsCopy.filter(
        product =>
            product.name &&
            product.name.toLowerCase().includes(productsSearch.toLowerCase())
    );

    const productsCount = filteredProducts.length;
    const pageSize = 9;
    const productsCrop = paginate(filteredProducts, currentPage, pageSize);

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Наименование обязательно для заполнения!',
            },
        },
        category: {
            isRequired: {
                message: 'Категория обязательна для заполнения!',
            },
        },
        price: {
            isRequired: {
                message: 'Стоимость обязательна для заполнения!',
            },
            isNumber: {
                message: 'Стоимость введена некорректно!',
            },
        },
        count: {
            isRequired: {
                message: 'Количество обязательно для заполнения!',
            },
            isNumber: {
                message: 'Количество введено некорректно!',
            },
        },
        photo: {
            isRequired: {
                message: 'Фото обязательно для заполнения!',
            },
        },
    };

    const isValid = Object.keys(errors).length === 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = ({ target }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        await createProductData({
            ...data,
            count: Number(data.count),
            price: Number(data.price.toLocaleString()),
        });

        setData({
            name: '',
            price: '',
            photo: '',
            category: '',
            count: '',
        });

        toast.success(`Товар "${data.name}" добавлен в магазин!`);
    };

    const handleProductsSearch = ({ target }) => {
        setProductsSearch(target.value);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleRemoveProduct = async (productId, productName) => {
        await removeProductData(productId);
        toast.error(`Товар "${productName}" удален из магазина!`);
    };

    return (
        <div
            className="d-flex flex-column overflow-hidden"
            style={{ minHeight: 85 + 'vh' }}
        >
            <div className="container py-3">
                <div className="row gy-5">
                    <div className="col-lg-3">
                        <AddProductForm
                            data={data}
                            categories={categoriesList}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            disabled={!isValid}
                            errors={errors}
                        />
                    </div>

                    <div className="col-lg-9">
                        <div className="input-group mb-5">
                            <TheInput
                                type="text"
                                name="productsSearch"
                                placeholder="Поиск по названию товара..."
                                value={productsSearch}
                                onChange={handleProductsSearch}
                            />
                        </div>

                        <ProductsTable
                            filteredProducts={filteredProducts}
                            products={productsCrop}
                            onRemoveProduct={handleRemoveProduct}
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-auto">
                <Pagination
                    itemsCount={productsCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AdminPanel;
