import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Admin from './page/Admin';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
