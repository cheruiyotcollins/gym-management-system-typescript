import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState } from "../../store/reducers";
import Navbar from "../../layouts/Navbar";
import Login from "../../pages/auth/Login";
import Cart from "../../pages/carts/CartPage";
import Register from "../../pages/auth/Register";
import Details from "../../pages/products/Details";
import Products from "../../pages/products/Index";
import CheckoutPage from "../../pages/carts/CheckoutPage";
import Orders from "../../pages/Orders/Orders";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
const Router = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      {/* {isLoggedIn ? <Navbar /> : null} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
