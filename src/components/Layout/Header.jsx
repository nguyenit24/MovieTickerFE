import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Phim", href: "/movies" },
    { name: "Blog", href: "/blogs" },
  ];

  return (
    <header className="header">
      <style>
        {`
          .header {
            background: #23272f;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            position: sticky;
            top: 0;
            z-index: 50;
          }

          .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 14px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .header-logo a {
            font-size: 24px;
            font-weight: 700;
            color: #ff4b2b;
            text-decoration: none;
            letter-spacing: 0.5px;
          }

          .header-menu {
            display: flex;
            gap: 28px;
          }

          .menu-link {
            color: #f1f1f1;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .menu-link.active,
          .menu-link:hover {
            color: #ff4b2b;
          }

          .header-login .login-link {
            display: flex;
            align-items: center;
            color: #f1f1f1;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .header-login .login-link:hover {
            color: #ff4b2b;
          }

          .icon {
            margin-right: 6px;
            color: #ff4b2b;
          }

          .dropdown-menu {
            background-color: #2d323b;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .dropdown-item {
            color: #fff;
          }
          .dropdown-item:hover {
            background-color: #ff4b2b;
          }
        `}
      </style>

      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">SUPERMOVIE</Link>
        </div>

        {/* Menu */}
        <nav className="header-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              {item.name}
            </NavLink>
          ))}
          {user && user.roles?.includes("ROLE_ADMIN") && (
            <NavLink to="/admin" className="menu-link text-warning">
              Quản trị
            </NavLink>
          )}
        </nav>

        {/* Khu vực đăng nhập / user */}
        <div className="header-login">
          {user ? (
            <div className="dropdown">
              <a
                href="#"
                className="login-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <User size={18} className="icon" />
                <span>{user.username}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/tickets">
                    Vé của tôi
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <Link to="/login" className="login-link">
                <User size={18} className="icon" />
                <span>Đăng nhập</span>
              </Link>
              <Link to="/register" className="btn btn-danger btn-sm fw-semibold">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
