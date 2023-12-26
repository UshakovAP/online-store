import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { useCategory } from '../../hooks/useCategories';
import { validator } from '../../utils/validator';
import { toast } from 'react-toastify';
import TheLabel from '../common/controls/theLabel';
import TheInput from '../common/controls/theInput';
import TheSelect from '../common/controls/theSelect';
import TheButton from '../common/controls/theButton';

const EditProductForm = () => {
    const navigate = useNavigate();
    let { productId } = useParams();
    const { getProductById, updateProductData } = useProduct();
    const currentProduct = getProductById(productId);
    const [data, setData] = useState();
    const { categories } = useCategory();
    const categoriesList = categories.map(category => ({
        _id: category._id,
        name: category.name,
    }));
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentProduct && !data) {
            setData({
                ...currentProduct,
                count: currentProduct.count.toString(),
                price: currentProduct.price.toString(),
            });
        }
    }, [currentProduct, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Наименование обязательно для заполнения!',
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

        await updateProductData({
            ...data,
            count: Number(data.count),
            price: Number(data.price.toLocaleString()),
        });

        navigate('/admin');
        toast.info(`Данные о товаре "${data.name}" обновлены!`);
    };

    return (
        <>
            {!isLoading && categories.length && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 p-3 shadow">
                            <form
                                className="d-flex flex-column"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-3">
                                    <TheLabel
                                        htmlFor="name"
                                        text="Наименование"
                                    />
                                    <TheInput
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />
                                </div>

                                <div className="mb-3">
                                    <TheLabel
                                        htmlFor="category"
                                        text="Категория"
                                    />
                                    <TheSelect
                                        className="form-select"
                                        defaultValue="Выберите категорию товара..."
                                        options={categoriesList}
                                        name="category"
                                        value={data.category}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <TheLabel
                                        htmlFor="price"
                                        text="Стоимость"
                                    />
                                    <TheInput
                                        type="text"
                                        name="price"
                                        value={data.price}
                                        onChange={handleChange}
                                        error={errors.price}
                                    />
                                </div>

                                <div className="mb-3">
                                    <TheLabel
                                        htmlFor="count"
                                        text="Количество"
                                    />
                                    <TheInput
                                        type="text"
                                        name="count"
                                        value={data.count}
                                        onChange={handleChange}
                                        error={errors.count}
                                    />
                                </div>

                                <div className="mb-3">
                                    <TheLabel htmlFor="photo" text="Фото" />
                                    <TheInput
                                        type="text"
                                        name="photo"
                                        value={data.photo}
                                        onChange={handleChange}
                                        error={errors.photo}
                                    />
                                </div>

                                <TheButton
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={!isValid}
                                    text="Редактировать товар"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProductForm;
