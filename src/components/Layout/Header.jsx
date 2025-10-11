import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import hook để lấy thông tin user

const Header = () => {
  // Lấy ra thông tin user và hàm logOut từ "trung tâm điều phối" AuthContext
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(); // Gọi hàm xóa thông tin đăng nhập
    navigate("/"); // Chuyển người dùng về trang chủ
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              src="/images/cinema_logo.png"
              alt="Logo"
              width="40"
              height="32"
            />
            <span className="fs-4 ms-2">MovieTicker</span>
          </Link>

          {/* Menu */}
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className="nav-link px-2 text-white">
                Phim
              </NavLink>
            </li>

            {/* --- LOGIC PHÂN QUYỀN GIAO DIỆN --- */}
            {/* Chỉ hiển thị link "Quản trị" nếu user tồn tại và có vai trò là ROLE_ADMIN */}
            {user && user.roles.includes("ROLE_ADMIN") && (
              <li>
                <NavLink to="/admin" className="nav-link px-2 text-warning">
                  Quản trị
                </NavLink>
              </li>
            )}
          </ul>

          {/* Khu vực Đăng nhập / Người dùng */}
          <div className="text-end">
            {user ? (
              // --- GIAO DIỆN KHI ĐÃ ĐĂNG NHẬP ---
              <div className="dropdown">
                <a
                  href="#"
                  className="d-block link-light text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Chào, {user.username}
                </a>
                <ul
                  className="dropdown-menu text-small"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Lịch sử đặt vé
                    </a>
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
              // --- GIAO DIỆN KHI CHƯA ĐĂNG NHẬP ---
              <div>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-warning">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
