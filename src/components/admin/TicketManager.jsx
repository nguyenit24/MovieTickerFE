import React, { useState, useEffect } from 'react';
import paymentService from '../../services/paymentService';
import { useToast } from '../common/Toast';
import { useNavigate } from 'react-router-dom';
import { Ticket, Search } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'PAID', label: 'PAID' },
  { value: 'CANCELLED', label: 'CANCELLED' },
  { value: 'PROCESSING', label: 'PROCESSING' },
  { value: 'REFUNDED', label: 'REFUNDED' },
  { value: 'EXPIRED', label: 'EXPIRED' }
];

const TicketManager = () => {
  const { showError } = useToast();
  const [filters, setFilters] = useState({ tenPhim: '', nam: '', trangThai: '', maHoaDon: '' });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);

  const fetchTickets = async (page = 1) => {
    setLoading(true);
    try {
      const params = { ...filters, page, size: 10 };
      const res = await paymentService.searchTickets(params);
      if (res.success) {
        setData(res.data);
        setTotalPages(res.data.totalPages || 1);
        setCurrentPage(res.data.currentPage || 1);
      } else {
        showError(res.message);
      }
    } catch (error) {
      console.error(error);
      showError('Lỗi khi tải vé');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchTickets(1);
  };

  const resetFilters = () => {
    setFilters({ tenPhim: '', nam: '', trangThai: '', maHoaDon: '' });
    setCurrentPage(1);
    fetchTickets(1);
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Header giống MovieManagement */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary text-white p-3 rounded">
              <Ticket size={32} />
            </div>
            <div>
              <h1 className="mb-0 h3">Quản Lý Vé</h1>
              <p className="text-muted mb-0">Hệ thống quản lý rạp chiếu phim</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={18} />
            </span>
            <input
              name="tenPhim"
              value={filters.tenPhim}
              onChange={handleChange}
              className="form-control"
              placeholder="Tên phim"
            />
          </div>
        </div>
        <div className="col-md-2">
          <input
            name="nam"
            value={filters.nam}
            onChange={handleChange}
            className="form-control"
            placeholder="Năm"
            type="number"
          />
        </div>
        <div className="col-md-2">
          <select
            name="trangThai"
            value={filters.trangThai}
            onChange={handleChange}
            className="form-select"
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            name="maHoaDon"
            value={filters.maHoaDon}
            onChange={handleChange}
            className="form-control"
            placeholder="Mã hóa đơn"
          />
        </div>
        <div className="col-md-3 d-flex gap-2">
          <button className="btn btn-primary" onClick={applyFilters}>
            <i className="bi bi-search me-1"></i> Tìm
          </button>
          <button className="btn btn-outline-secondary" onClick={resetFilters}>
            <i className="bi bi-arrow-clockwise me-1"></i> Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Mã vé</th>
                  <th>Phim</th>
                  <th>Ghế</th>
                  <th>Ngày chiếu</th>
                  <th>Trạng thái</th>
                  <th>Giá</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {data?.items?.length > 0 ? (
                  data.items.map(t => (
                    <tr key={t.maVe}>
                      <td>{t.maVe}</td>
                      <td>{t.tenPhim}</td>
                      <td>{t.tenGhe}</td>
                      <td>{new Date(t.ngayChieu).toLocaleString('vi-VN')}</td>
                      <td>
                        <span
                          className={`badge ${
                            t.trangThai === 'PAID'
                              ? 'bg-success'
                              : t.trangThai === 'CANCELLED'
                              ? 'bg-danger'
                              : 'bg-warning'
                          }`}
                        >
                          {t.trangThai}
                        </span>
                      </td>
                      <td>{t.thanhTien?.toLocaleString()} VND</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/admin/tickets/${t.maVe}`)}
                        >
                          <i className="bi bi-eye me-1"></i> Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <i className="bi bi-inbox display-4 text-muted"></i>
                      <p className="text-muted mt-2">Không tìm thấy vé nào.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination giống MovieManagement */}
        {totalPages > 1 && (
          <div className="card-footer bg-white">
            <nav>
              <ul className="pagination pagination-sm justify-content-center mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <li
                    key={pageNum}
                    className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => setCurrentPage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketManager;
