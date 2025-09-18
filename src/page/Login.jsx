import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    // Xử lý đăng nhập ở đây
    setError('');
    alert('Đăng nhập thành công!');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 login-page py-5" style={{ 
        background: 'linear-gradient(135deg, #23272f 0%, #121417 100%)',
        padding: '50px 0'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-card card border-0 shadow-lg" style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'rgba(35, 39, 47, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="card-header text-center border-0 pt-4 pb-0" style={{ background: 'transparent' }}>
                  {/* <img 
                    src="" 
                    alt="Movie Tickets" 
                    style={{ height: '80px', marginBottom: '10px' }}
                  /> */}
                  <h3 className="fw-bold" style={{ color: '#ff4b2b' }}>Đăng nhập</h3>
                  <p className="text-muted small">Chào mừng bạn trở lại!</p>
                </div>

                <div className="card-body px-4 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-light">Tên đăng nhập</label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent text-light border-end-0">
                          <i className="fas fa-user"></i>
                        </span>
                        <input 
                          type="text" 
                          className="form-control bg-transparent text-light border-start-0" 
                          placeholder="Nhập tên đăng nhập"
                          value={username} 
                          onChange={e => setUsername(e.target.value)}
                          style={{ fontSize: '1rem' }}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label small fw-bold text-light">Mật khẩu</label>
                        <a href="#" className="small text-decoration-none" style={{ color: '#ff4b2b' }}>Quên mật khẩu?</a>
                      </div>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent text-light border-end-0">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input 
                          type="password" 
                          className="form-control bg-transparent text-light border-start-0" 
                          placeholder="Nhập mật khẩu"
                          value={password} 
                          onChange={e => setPassword(e.target.value)}
                          style={{ fontSize: '1rem' }}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="alert alert-danger py-2 mb-3 text-center" style={{ fontSize: '0.9rem' }}>
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn w-100 py-2 mb-3 fw-bold" 
                      style={{ 
                        background: '#ff4b2b',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Đăng nhập
                    </button>

                    <div className="text-center mt-3">
                      <span className="text-muted small">Bạn chưa có tài khoản? </span>
                      <a href="#" className="small text-decoration-none" style={{ color: '#ff4b2b' }}>Đăng ký ngay</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
