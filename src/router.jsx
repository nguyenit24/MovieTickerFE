import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Admin from './page/Admin';
import BookingPage from './page/BookingPage';
import TicketsPage from './page/TicketsPage';
import InvoiceDetail from './components/ticket/InvoiceDetail';
import PaymentReturn from './components/payment/PaymentReturn';
import VNPayRedirect from './components/payment/VNPayRedirect';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/booking/:movieId" element={<BookingPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route 
        path="/invoice/:invoiceId" 
        element={
          <>
            <Header />
            <InvoiceDetail />
            <Footer />
          </>
        } 
      />
      <Route 
        path="/payment/return" 
        element={
          <>
            <Header />
            <PaymentReturn />
            <Footer />
          </>
        } 
      />
      <Route 
        path="/api/payment/return" 
        element={<VNPayRedirect />}
      />
      <Route 
        path="/vnpay_return" 
        element={<VNPayRedirect />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
