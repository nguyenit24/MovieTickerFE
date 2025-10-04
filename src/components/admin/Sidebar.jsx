
import React from 'react';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'user', icon: '👥', label: 'Người dùng' },
    { id: 'film', icon: '🎬', label: 'Phim' },
    { id: 'room', icon: '🎭', label: 'Phòng chiếu' },
    { id: 'schedule', icon: '📅', label: 'Suất chiếu' },
    { id: 'ticket', icon: '🎟️', label: 'Loại vé' },
    { id: 'revenue', icon: '💰', label: 'Doanh thu' }
  ];

  return (
    <div className="min-h-screen p-4" style={{ background: '#23272f', color: '#fff' }}>
      <div className="mb-8 text-center">
        <img 
          src="https://i.pinimg.com/originals/54/a2/cf/54a2cfd5fc1970a4222eeb3e4fc9d724.png" 
          alt="CineTickets" 
          style={{ height: '40px' }}
          className="mb-2"
        />
        <h1 className="text-xl font-bold" style={{ color: '#ff4b2b' }}>CineTickets Admin</h1>
      </div>
      
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-3 px-2">HỆ THỐNG</p>
        <button 
          onClick={() => setActiveMenu('dashboard')}
          className={`w-full text-left px-4 py-3 rounded mb-2 transition-all ${
            activeMenu === 'dashboard' 
              ? 'bg-orange-600 text-white' 
              : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          📊 Dashboard
        </button>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-3 px-2">QUẢN LÝ</p>
        {menuItems.slice(1).map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full text-left px-4 py-3 rounded mb-2 transition-all ${
              activeMenu === item.id 
                ? 'bg-orange-600 text-white' 
                : 'hover:bg-gray-700 text-gray-300'
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-600">
        <button className="w-full text-left px-4 py-3 rounded text-red-400 hover:bg-red-900/30 transition-all">
          🚪 Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;