
import React from 'react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { id: 'user', icon: 'bi-people', label: 'Người dùng' },
    { id: 'film', icon: 'bi-film', label: 'Phim' },
    { id: 'category', icon: 'bi-tags', label: 'Thể loại' },
    { id: 'room', icon: 'bi-house', label: 'Phòng chiếu' },
    { id: 'schedule', icon: 'bi-calendar3', label: 'Suất chiếu' },
    { id: 'seat', icon: 'bi-ticket-perforated', label: 'Loại ghế' },
    { id: 'revenue', icon: 'bi-currency-dollar', label: 'Doanh thu' }
  ];

  return (
    <div className="bg-dark text-white d-flex flex-column h-100 p-0">
      {/* Header */}
      <div className="p-4 border-bottom border-secondary">
        <div className="text-center">
          <img 
            src="/images/cinema_logo.png" 
            alt="CineTickets" 
            style={{ height: '40px' }}
            className="mb-2"
          />
          <h4 className="text-warning fw-bold mb-0">CineTickets</h4>
          <small className="text-muted">Admin Panel</small>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex-grow-1 p-3">
        {/* Dashboard Section */}
        <div className="mb-4">
          <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ fontSize: '0.75rem' }}>
            HỆ THỐNG
          </h6>
          <button 
            onClick={() => setActiveMenu('dashboard')}
            className={`btn w-100 text-start mb-2 d-flex align-items-center ${
              activeMenu === 'dashboard' 
                ? 'btn-warning text-dark fw-bold' 
                : 'btn-outline-secondary text-white border-0'
            }`}
            style={{ height: '45px' }}
          >
            <i className={`bi ${menuItems[0].icon} me-3`}></i>
            {menuItems[0].label}
          </button>
        </div>

        {/* Management Section */}
        <div className="mb-4">
          <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ fontSize: '0.75rem' }}>
            QUẢN LÝ
          </h6>
          {menuItems.slice(1).map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`btn w-100 text-start mb-2 d-flex align-items-center ${
                activeMenu === item.id 
                  ? 'btn-warning text-dark fw-bold' 
                  : 'btn-outline-secondary text-white border-0'
              }`}
              style={{ height: '45px' }}
            >
              <i className={`bi ${item.icon} me-3`}></i>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-top border-secondary">
        <div className="mb-3">
          <div className="d-flex align-items-center p-2 bg-secondary bg-opacity-25 rounded">
            <div className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-2" 
                 style={{ width: '32px', height: '32px' }}>
              <i className="bi bi-person-fill text-dark"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold" style={{ fontSize: '0.875rem' }}>Admin User</div>
              <small className="text-muted">Administrator</small>
            </div>
          </div>
        </div>
        
        <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
          <i className="bi bi-box-arrow-right me-2"></i>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;