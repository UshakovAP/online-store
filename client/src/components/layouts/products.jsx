import React, { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProducts';
import { useCategory } from '../../hooks/useCategories';
import { useBasket } from '../../hooks/useBasket';
import { paginate } from '../../utils/paginate';
import TheInput from '../common/controls/theInput';
import GroupList from '../common/groupList';
import TheButton from '../common/controls/theButton';
import Loader from '../common/loader';
import TheSelect from '../common/controls/theSelect';
import ProductList from '../common/product/productList';
import ErrorMessage from '../common/errorMessage';
import Pagination from '../common/pagination';

const Products = () => {
    const { products } = useProduct();
    const { isLoading: categoriesLoading, categories } = useCategory();
    const { getBasketItems } = useBasket();
    const [productsCopy, setProductsCopy] = useState(products);
    const [productsSearch, setProductsSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();
    const [productsSort, setProductsSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, productsSearch]);

    useEffect(() => {
        getBasketItems();
    }, []);

    const pageSize = 3;
    const filteredProducts = productsSearch
        ? productsCopy.filter(product =>
              product.name.toLowerCase().includes(productsSearch.toLowerCase())
          )
        : selectedCategory
        ? productsCopy.filter(
              product => product.category === selectedCategory.name
          )
        : productsCopy;
    const productsCount = filteredProducts.length;
    const productsCrop = paginate(filteredProducts, currentPage, pageSize);

    const handleProductsSearch = ({ target }) => {
        setSelectedCategory(undefined);
        setProductsSearch(target.value);
    };

    const handleCategorySelect = item => {
        if (productsSearch !== '') {
            setProductsSearch('');
        }
        setSelectedCategory(item);
    };

    const clearFilter = () => {
        setSelectedCategory(undefined);
    };

    const handleProductsSort = sort => {
        setProductsSort(sort);
        setProductsCopy(
            products.sort((a, b) => {
                switch (sort) {
                    case 'сортировка по возрастанию стоимости':
                        return a.price - b.price;
                    case 'сортировка по убыванию стоимости':
                        return b.price - a.price;
                    case 'без сортировки':
                        return a.name.localeCompare(b.name);
                }
            })
        );
    };
    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    return (
        <div
            className="d-flex flex-column overflow-hidden"
            style={{ minHeight: 85 + 'vh' }}
        >
            <div className="container">
                <div className="input-group mb-5 py-1">
                    <TheInput
                        type="text"
                        name="productsSearch"
                        placeholder="Поиск по названию товара..."
                        value={productsSearch}
                        onChange={handleProductsSearch}
                    />
                </div>

                {filteredProducts.length ? (
                    <div className="row gy-5">
                        <div className="col-lg-3">
                            {categories && !categoriesLoading ? (
                                <>
                                    <GroupList
                                        items={categories}
                                        selectedItem={selectedCategory}
                                        onItemSelect={handleCategorySelect}
                                    />
                                    <TheButton
                                        className="btn btn-primary w-100"
                                        type="button"
                                        onClick={clearFilter}
                                        text="Очистить"
                                    />
                                </>
                            ) : (
                                <Loader style={{ minHeight: 60 + '%' }} />
                            )}
                        </div>

                        <div className="col-lg-9">
                            <div className="mb-5">
                                <TheSelect
                                    options={[
                                        {
                                            _id: 'null',
                                            name: 'без сортировки',
                                        },
                                        {
                                            _id: 'inc',
                                            name: 'сортировка по возрастанию стоимости',
                                        },
                                        {
                                            _id: 'dec',
                                            name: 'сортировка по убыванию стоимости',
                                        },
                                    ]}
                                    value={productsSort}
                                    onChange={({ target }) =>
                                        handleProductsSort(target.value)
                                    }
                                />
                            </div>
                            <ProductList products={productsCrop} />
                        </div>
                    </div>
                ) : (
                    <ErrorMessage text="Товары не найдены!" />
                )}
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

export default Products;
