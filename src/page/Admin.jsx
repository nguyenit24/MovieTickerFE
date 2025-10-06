import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Dashboard from '../components/admin/Dashboard';
import MovieManagement from '../components/admin/MovieManagement';
import CategoryManager from '../components/admin/CategoryManager';
import RoomManager from '../components/admin/RoomManager';
import ScheduleManager from '../components/admin/ScheduleManager';

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'film':
        return <MovieManagement />;
      case 'category':
        return <CategoryManager />;
      case 'user':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-people me-2"></i>
                Quản lý người dùng
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="text-center py-5">
                <i className="bi bi-code-slash text-muted" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">Đang phát triển</h4>
                <p className="text-muted">Chức năng quản lý người dùng sẽ sớm được cập nhật.</p>
              </div>
            </div>
          </div>
        );
      case 'room':
        return <RoomManager />;
      case 'schedule':
        return <ScheduleManager />;
      case 'ticket':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-ticket-perforated me-2"></i>
                Quản lý loại vé
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="text-center py-5">
                <i className="bi bi-code-slash text-muted" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">Đang phát triển</h4>
                <p className="text-muted">Chức năng quản lý loại vé sẽ sớm được cập nhật.</p>
              </div>
            </div>
          </div>
        );
      case 'revenue':
        return (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="card-title mb-0 text-primary">
                <i className="bi bi-currency-dollar me-2"></i>
                Báo cáo doanh thu
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="text-center py-5">
                <i className="bi bi-bar-chart text-muted" style={{ fontSize: '3rem' }}></i>
                <h4 className="mt-3">Đang phát triển</h4>
                <p className="text-muted">Chức năng báo cáo doanh thu sẽ sớm được cập nhật.</p>
              </div>
            </div>
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
        <div className="admin-header bg-light shadow-sm border-bottom">
          <div className="d-flex justify-content-between align-items-center px-4 py-3">
            <h1 className="mb-0 h4 text-primary">Admin Panel - CineTickets</h1>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '32px', height: '32px' }}>
                  <i className="bi bi-person-fill text-white"></i>
                </div>
                <span className="text-muted">Xin chào, Admin</span>
              </div>
              <button className="btn btn-outline-danger btn-sm">
                <i className="bi bi-box-arrow-right me-1"></i> Đăng xuất
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Admin;