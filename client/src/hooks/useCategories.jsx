import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import categoryService from '../services/category.service';

const CategoryContext = React.createContext();

export const useCategory = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategoriesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };

    const getCategoriesList = async () => {
        try {
            const { content } = await categoryService.get();
            setCategories(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getCategory = id => {
        return categories.find(category => category._id === id);
    };

    return (
        <CategoryContext.Provider
            value={{ isLoading, categories, getCategory }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
