import React, { useState } from 'react';
import { Search, User, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/google", { credentials: "include" })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then(({data}) => { setUser(data) ; console.log(data);})
      .catch(() => setUser(null));
  }, []);
  return (
    <>
      <header className="shadow-sm" style={{ 
        background: '#23272f',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          {/* Top Header */}
          <div className="d-flex align-items-center justify-content-between py-3">
            {/* Logo */}
            <div className="d-flex align-items-center">
              <Link to="/" className="text-decoration-none d-flex align-items-center">
                <img 
                  src="https://i.pinimg.com/originals/54/a2/cf/54a2cfd5fc1970a4222eeb3e4fc9d724.png" 
                  alt="Movie Ticket" 
                  style={{ height: '40px' }}
                  className="me-2"
                />
                <span className="fw-bold fs-4" style={{ color: '#ff4b2b' }}>CineTickets</span>
              </Link>
            </div>

            {/* Hamburger menu for mobile */}
            <button 
              className="btn d-lg-none text-light border-0" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Navigation - Desktop */}
            <nav className="d-none d-lg-flex flex-grow-1 justify-content-center">
              <Link to="/" className="text-light fw-medium text-decoration-none mx-3 d-flex align-items-center">
                <i className="fas fa-film me-1"></i> Phim
              </Link>
              <a href="#" className="text-light fw-medium text-decoration-none mx-3 d-flex align-items-center">
                <i className="fas fa-ticket-alt me-1"></i> Đặt vé
              </a>
              <a href="#" className="text-light fw-medium text-decoration-none mx-3 d-flex align-items-center">
                <i className="fas fa-percentage me-1"></i> Khuyến mãi
              </a>
            </nav>

            {/* Right side - Desktop */}
            <div className="d-none d-lg-flex align-items-center">
              {/* Search box */}
              <div className="position-relative me-3">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm phim..." 
                  className="form-control border-0 rounded-pill pe-5"
                  style={{
                    width: '220px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff'
                  }}
                />
                <Search 
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-light" 
                  size={16} 
                />
              </div>
              
              {user ? (
                <>
                <div className="d-flex align-items-center text-light">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="rounded-circle me-2" 
                    style={{ width: "32px", height: "32px" }}
                  />
                  <span className="text-light">{user.name}</span>
                </div>
                <a 

                  className="btn d-flex align-items-center text-decoration-none me-3" 
                  href="http://localhost:8080/logout"
                  style={{ color: '#ff4b2b' }}
                >
                  Đăng xuất
                </a>
                </>
              ) : (
                <>
                  <Link 
                    className="btn d-flex align-items-center text-decoration-none me-3" 
                    to="/login"
                    style={{ color: '#ff4b2b' }}
                  >
                    <User size={18} className="me-2" />
                    Đăng nhập
                  </Link>
                  <a 
                    href="http://localhost:8080/oauth2/authorization/google" 
                    className="btn d-flex align-items-center me-3"
                  >
                    <img 
                      src="https://developers.google.com/identity/images/g-logo.png" 
                      alt="Google login" 
                      style={{ width: '20px', marginRight: '8px', color: 'white' }}
                    />
                    Google
                  </a>
                </>
              )}
              <button className="btn d-flex align-items-center" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                <span className="me-1">VN</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
