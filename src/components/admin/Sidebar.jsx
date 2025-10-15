import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logOut } = useAuth();
  // Lấy phần sau 'admin' trong pathname
  const activeMenu = location.pathname.split("/")[2];
  const isActive = (id) => activeMenu && activeMenu.startsWith(id);

  const handleLogout = async () => {
    await authService.logout(); // Gọi API logout
    logOut(); // Xóa token và user ở client
    navigate("/login"); // Chuyển về trang login
  };

  const systemItems = [
    { id: "dashboard", icon: "bi-speedometer2", label: "Dashboard" },
    { id: "settings", icon: "bi-gear-wide", label: "Cài đặt hệ thống" },
  ];

  const cinemaItems = [
    { id: "room", icon: "bi-house", label: "Phòng chiếu" },
    { id: "seat", icon: "bi-ticket-perforated", label: "Loại ghế" },
  ];

  const movieItems = [
    { id: "film", icon: "bi-film", label: "Phim" },
    { id: "category", icon: "bi-tags", label: "Thể loại" },
    { id: "schedule", icon: "bi-calendar3", label: "Suất chiếu" },
  ];

  const otherItems = [
    { id: "user", icon: "bi-people", label: "Người dùng" },
    { id: "service", icon: "bi-tools", label: "Dịch vụ khác" },
    { id: "promotion", icon: "bi-gift", label: "Khuyến mãi" },
    { id: "invoices", icon: "bi-receipt", label: "Hóa đơn" },
    { id: "tickets", icon: "bi-ticket", label: "Vé" },
    { id: "review", icon: "bi-chat-left-text", label: "Đánh giá phim" },
    { id: "revenue", icon: "bi-currency-dollar", label: "Doanh thu" },
  ];

  return (
    <div className="bg-dark text-white d-flex flex-column h-100 p-0">
      {/* Header */}
      <div className="p-4 border-bottom border-secondary">
        <div className="text-center">
          <img
            src="/images/cinema_logo.png"
            alt="CineTickets"
            style={{ height: "40px" }}
            className="mb-2"
          />
          <h4 className="text-warning fw-bold mb-0">CineTickets</h4>
          <small className="text-muted">Admin Panel</small>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-grow-1 p-3">
        {/* System Section */}
        <div className="mb-4">
          <h6
            className="text-uppercase text-white fw-bold mb-3"
            style={{ fontSize: "0.75rem" }}
          >
            HỆ THỐNG
          </h6>
          {systemItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/admin/${item.id}`)}
              className={`btn w-100 text-start mb-2 d-flex align-items-center ${
                isActive(item.id)
                  ? "btn-warning text-dark fw-bold"
                  : "btn-outline-secondary text-white border-0"
              }`}
              style={{ height: "45px" }}
            >
              <i className={`bi ${item.icon} me-3`}></i>
              {item.label}
            </button>
          ))}
        </div>

        {/* Cinema Section */}
        <div className="mb-4">
          <h6
            className="text-uppercase text-white fw-bold mb-3"
            style={{ fontSize: "0.75rem" }}
          >
            RẠP PHIM
          </h6>
          {cinemaItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/admin/${item.id}`)}
              className={`btn w-100 text-start mb-2 d-flex align-items-center ${
                isActive(item.id)
                  ? "btn-warning text-dark fw-bold"
                  : "btn-outline-secondary text-white border-0"
              }`}
              style={{ height: "45px" }}
            >
              <i className={`bi ${item.icon} me-3`}></i>
              {item.label}
            </button>
          ))}
        </div>

        {/* Movie Section */}
        <div className="mb-4">
          <h6
            className="text-uppercase text-white fw-bold mb-3"
            style={{ fontSize: "0.75rem" }}
          >
            PHIM
          </h6>
          {movieItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/admin/${item.id}`)}
              className={`btn w-100 text-start mb-2 d-flex align-items-center ${
                isActive(item.id)
                  ? "btn-warning text-dark fw-bold"
                  : "btn-outline-secondary text-white border-0"
              }`}
              style={{ height: "45px" }}
            >
              <i className={`bi ${item.icon} me-3`}></i>
              {item.label}
            </button>
          ))}
        </div>

        {/* Other Section */}
        <div className="mb-4">
          <h6
            className="text-uppercase text-white fw-bold mb-3"
            style={{ fontSize: "0.75rem" }}
          >
            KHÁC
          </h6>
          {otherItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/admin/${item.id}`)}
              className={`btn w-100 text-start mb-2 d-flex align-items-center ${
                isActive(item.id)
                  ? "btn-warning text-dark fw-bold"
                  : "btn-outline-secondary text-white border-0"
              }`}
              style={{ height: "45px" }}
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
            <div
              className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-2"
              style={{ width: "32px", height: "32px" }}
            >
              <i className="bi bi-person-fill text-dark"></i>
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold" style={{ fontSize: "0.875rem" }}>
                Admin User
              </div>
              <small className="text-muted">Administrator</small>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
