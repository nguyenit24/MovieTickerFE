import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import MovieManagement from '../components/admin/MovieManagement';

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'film':
        return <MovieManagement />;
      case 'user':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
            <p>Trang quản lý người dùng đang được phát triển...</p>
          </div>
        );
      case 'room':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý phòng chiếu</h2>
            <p>Trang quản lý phòng chiếu đang được phát triển...</p>
          </div>
        );
      case 'schedule':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý suất chiếu</h2>
            <p>Trang quản lý suất chiếu đang được phát triển...</p>
          </div>
        );
      case 'ticket':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý loại vé</h2>
            <p>Trang quản lý loại vé đang được phát triển...</p>
          </div>
        );
      case 'revenue':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Báo cáo doanh thu</h2>
            <p>Trang báo cáo doanh thu đang được phát triển...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0" style={{ color: '#333' }}>Admin Panel - CineTickets</h1>
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">Xin chào, Admin</span>
              <button className="btn btn-outline-danger btn-sm">Đăng xuất</button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;