import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Admin from './page/Admin';
import Dashboard from './components/admin/Dashboard';
import MovieManagement from './components/admin/MovieManagement';
import CategoryManager from './components/admin/CategoryManager';
import RoomManager from './components/admin/RoomManager';
import ScheduleManager from './components/admin/ScheduleManager';
import SeatManager from './components/admin/SeatManager';
import UserManager from './components/admin/UserManager';
import RevenueManager from './components/admin/RevenueManager';
import SettingsManager from './components/admin/SettingsManager';
import ServiceManager from './components/admin/ServiceManager';
import MovieDetail from './components/admin/MovieDetail';
import PromotionManager from "./components/admin/PromotionManager.jsx";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="film" element={<MovieManagement />} />
        <Route path="category" element={<CategoryManager />} />
        <Route path="room" element={<RoomManager />} />
        <Route path="schedule" element={<ScheduleManager />} />
        <Route path="seat" element={<SeatManager />} />
        <Route path="user" element={<UserManager />} />
        <Route path="revenue" element={<RevenueManager />} />
        <Route path="settings" element={<SettingsManager />} />
        <Route path="service" element={<ServiceManager />} />
          <Route path="promotion" element={<PromotionManager />} />
        <Route path="rooms/:roomId/seats" element={<SeatManager />} />
        <Route path="film/:movieId" element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
