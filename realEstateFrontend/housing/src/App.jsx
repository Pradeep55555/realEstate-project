import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./component/home/Home";
import SellerLogin from "./component/seller/SellerLogin";
import SellerSignup from "./component/seller/SellerSignup";
import ForgotPassword from "./component/seller/ForgotPassword";
import BuyerDashboard from "./component/buyer/BuyerDashboard";
import BuyerForgotPassword from "./component/buyer/BuyerForgotPassword";
import AdminLogin from "./component/admin/AdminLogin";


import BuyerPayment from "./component/buyerPayment/BuyerPayment";

import './App.css'

function App() {
  return (

     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/payment/:property_number" element={<BuyerPayment />} />
        <Route path="/seller/forgot-password" element={<ForgotPassword />} />
        <Route path="/buyer/forgot-password" element={<BuyerForgotPassword />} />
        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
