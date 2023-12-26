import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../hooks/useAuth';
import NavBar from './UI/navBar';
import ProductProvider from '../hooks/useProducts';
import { CategoryProvider } from '../hooks/useCategories';
import { BasketProvider } from '../hooks/useBasket';
import Login from './layouts/login';
import ProductUnit from './common/product/productUnit';
import ProtectedRoute from './common/protectedRoute';
import AdminPanelRoute from './common/adminPanelRoute';
import AdminPanel from './layouts/adminPanel';
import EditProductForm from './UI/editProductForm';
import Basket from './layouts/basket';
import Products from './layouts/products';
import LogOut from './common/logOut';

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />

                <ProductProvider>
                    <CategoryProvider>
                        <BasketProvider>
                            <Routes>
                                <Route
                                    path={'/login/:type?'}
                                    element={<Login />}
                                />
                                <Route
                                    path={'/:productId?'}
                                    element={<ProductUnit />}
                                />
                                <Route
                                    path={'/admin'}
                                    element={
                                        <AdminPanelRoute
                                            component={AdminPanel}
                                        />
                                    }
                                />
                                <Route
                                    path={'/admin/:productId?'}
                                    element={
                                        <ProtectedRoute
                                            component={EditProductForm}
                                        />
                                    }
                                />
                                <Route
                                    path={'/basket'}
                                    element={
                                        <ProtectedRoute component={Basket} />
                                    }
                                />
                                <Route path={'/'} element={<Products />} />
                                <Route
                                    path={'*'}
                                    element={<Navigate to="/" replace />}
                                />
                                <Route path="/logout" element={<LogOut />} />
                            </Routes>
                        </BasketProvider>
                    </CategoryProvider>
                </ProductProvider>
            </AuthProvider>

            <ToastContainer position="top-center" />
        </>
    );
};

export default App;
