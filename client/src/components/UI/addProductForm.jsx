import React from 'react';
import TheLabel from '../common/controls/theLabel';
import TheInput from '../common/controls/theInput';
import TheSelect from '../common/controls/theSelect';
import TheButton from '../common/controls/theButton';

const AddProductForm = ({
    data,
    categories,
    onChange,
    onSubmit,
    disabled,
    errors,
}) => {
    return (
        <div className="p-3 border rounded">
            <h2 className="mb-3 text-center">Блок для добавления товаров</h2>

            <form className="d-flex flex-column" onSubmit={onSubmit}>
                <div className="mb-3">
                    <TheLabel htmlFor="name" text="Наименование" />
                    <TheInput
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onChange}
                        error={errors.name}
                    />
                </div>

                <div className="mb-3">
                    <TheLabel htmlFor="category" text="Категория" />
                    <TheSelect
                        defaultValue="Выберите категорию..."
                        options={categories}
                        name="category"
                        value={data.category}
                        onChange={onChange}
                        error={errors.category}
                    />
                </div>

                <div className="mb-3">
                    <TheLabel htmlFor="price" text="Стоимость" />
                    <TheInput
                        type="text"
                        name="price"
                        value={data.price}
                        onChange={onChange}
                        error={errors.price}
                    />
                </div>

                <div className="mb-3">
                    <TheLabel htmlFor="count" text="Количество" />
                    <TheInput
                        type="text"
                        name="count"
                        value={data.count}
                        onChange={onChange}
                        error={errors.count}
                    />
                </div>

                <div className="mb-3">
                    <TheLabel htmlFor="photo" text="Фото" />
                    <TheInput
                        type="text"
                        name="photo"
                        placeholder="Вставьте URL фото..."
                        value={data.photo}
                        onChange={onChange}
                        error={errors.photo}
                    />
                </div>

                <TheButton
                    className="btn btn-primary"
                    type="submit"
                    disabled={disabled}
                    text="Добавить товар"
                />
            </form>
        </div>
    );
};

export default AddProductForm;
