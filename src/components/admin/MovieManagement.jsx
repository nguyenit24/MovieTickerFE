import React, { useState, useEffect } from 'react';
import movieService from '../../services/movieService';
import categoryService from '../../services/categoryService';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    tenPhim: '',
    moTa: '',
    daoDien: '',
    dienVien: '',
    thoiLuong: '',
    ngayKhoiChieu: '',
    hinhAnh: '',
    trailerURL: '',
    tuoi: '',
    trangThai: 'Sắp chiếu',
    theLoai: []
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await categoryService.getAllCategories();
    if (result.success) setCategories(result.data);
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const result = await movieService.getAllMovies();
      
      if (result.success) {
        setMovies(result.data);
      } else {
        console.error('Lỗi lấy danh sách phim:', result.message);
        setMovies([
          {
            maPhim: "P001",
            tenPhim: "Demon Slayer: Infinity Castle",
            moTa: "Phim hoạt hình Nhật Bản về những thợ săn quỷ",
            daoDien: "Haruo Sotozaki",
            dienVien: "Natsuki Hanae, Akari Kito",
            thoiLuong: 120,
            ngayKhoiChieu: "2024-12-15",
            hinhAnh: "https://via.placeholder.com/300x450/8B5CF6/ffffff?text=Demon+Slayer",
            trailerURL: "https://youtube.com/watch?v=example",
            tuoi: 13,
            trangThai: "Đang chiếu",
            listTheLoai: [{ tenTheLoai: "Hành động" }, { tenTheLoai: "Anime" }]
          }
        ]);
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, movie = null) => {
    setModalType(type);
    setSelectedMovie(movie);
    if (type === 'edit' && movie) {
      setFormData({
        tenPhim: movie.tenPhim || '',
        moTa: movie.moTa || '',
        daoDien: movie.daoDien || '',
        dienVien: movie.dienVien || '',
        thoiLuong: movie.thoiLuong || '',
        ngayKhoiChieu: movie.ngayKhoiChieu ? movie.ngayKhoiChieu.split('T')[0] : '',
        hinhAnh: movie.hinhAnh || '',
        trailerURL: movie.trailerURL || '',
        tuoi: movie.tuoi || '',
        trangThai: movie.trangThai || '',
        theLoai: movie.listTheLoai ? movie.listTheLoai.map(tl => tl.maTheLoai) : []
      });
    } else if (type === 'add') {
      setFormData({
        tenPhim: '',
        moTa: '',
        daoDien: '',
        dienVien: '',
        thoiLuong: '',
        ngayKhoiChieu: '',
        hinhAnh: '',
        trailerURL: '',
        tuoi: '',
        trangThai: 'Sắp chiếu',
        theLoai: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedMovie(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Chuyển mảng id thể loại sang mảng tên thể loại
    const theLoaiNames = categories
      .filter(cat => formData.theLoai.includes(cat.maTheLoai))
      .map(cat => cat.tenTheLoai);
    const submitData = { ...formData, theLoai: theLoaiNames };
    try {
      if (modalType === 'add') {
        const result = await movieService.createMovie(submitData);
        if (result.success) {
          alert('Thêm phim thành công!');
          fetchMovies();
          closeModal();
        } else {
          alert('Lỗi: ' + result.message);
        }
      } else if (modalType === 'edit') {
        const result = await movieService.updateMovie(selectedMovie.maPhim, submitData);
        if (result.success) {
          alert('Cập nhật phim thành công!');
          fetchMovies();
          closeModal();
        } else {
          alert('Lỗi: ' + result.message);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (movieId) => {
    if (window.confirm('Bạn có chắc muốn xóa phim này?')) {
      try {
        const result = await movieService.deleteMovie(movieId);
        if (result.success) {
          alert('Xóa phim thành công!');
          fetchMovies();
        } else {
          alert('Lỗi: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Có lỗi xảy ra');
      }
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredMovies = movies.filter(movie => 
    movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.daoDien.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

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
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h2 text-primary fw-bold">
              <i className="bi bi-film me-2"></i>
              Quản lý Phim
            </h1>
            <button 
              className="btn btn-primary"
              onClick={() => openModal('add')}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Thêm phim mới
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text"
              className="form-control"
              placeholder="Tìm kiếm phim, đạo diễn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Movies Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '80px' }}>Poster</th>
                  <th>Tên phim</th>
                  <th>Đạo diễn</th>
                  <th>Thể loại</th>
                  <th>Thời lượng</th>
                  <th>Ngày KC</th>
                  <th>Trạng thái</th>
                  <th style={{ width: '150px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentMovies.map((movie) => (
                  <tr key={movie.maPhim}>
                    <td>
                      <img 
                        src={movie.hinhAnh || 'https://via.placeholder.com/60x80/cccccc/666666?text=No+Image'} 
                        alt={movie.tenPhim}
                        className="rounded"
                        style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x80/cccccc/666666?text=No+Image';
                        }}
                      />
                    </td>
                    <td>
                      <div className="fw-bold">{movie.tenPhim}</div>
                      <small className="text-muted">Mã: {movie.maPhim}</small>
                    </td>
                    <td>{movie.daoDien}</td>
                    <td>{movie.listTheLoai ? movie.listTheLoai.map(tl => tl.tenTheLoai).join(', ') : 'N/A'}</td>
                    <td>{formatDuration(movie.thoiLuong)}</td>
                    <td>{formatDate(movie.ngayKhoiChieu)}</td>
                    <td>
                      <span className={`badge ${
                        movie.trangThai === 'Đang chiếu' ? 'bg-success' :
                        movie.trangThai === 'Sắp chiếu' ? 'bg-warning' :
                        'bg-secondary'
                      }`}>
                        {movie.trangThai}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button 
                          className="btn btn-sm btn-outline-info"
                          onClick={() => openModal('view', movie)}
                          title="Xem chi tiết"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => openModal('edit', movie)}
                          title="Chỉnh sửa"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(movie.maPhim)}
                          title="Xóa"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {currentMovies.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-film display-1 text-muted"></i>
              <p className="text-muted mt-2">Không tìm thấy phim nào.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
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
                  <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(pageNum)}
                    >
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

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block modal-overlay">
          <div className={`modal-dialog modal-lg ${modalType === 'view' ? 'modal-xl' : ''} mx-auto`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'add' && 'Thêm phim mới'}
                  {modalType === 'edit' && 'Chỉnh sửa phim'}
                  {modalType === 'view' && 'Chi tiết phim'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              {modalType === 'view' ? (
                <div className="modal-body">
                  {selectedMovie && (
                    <div className="row">
                      <div className="col-md-4">
                        <img 
                          src={selectedMovie.hinhAnh || 'https://via.placeholder.com/300x400/cccccc/666666?text=No+Image'} 
                          alt={selectedMovie.tenPhim}
                          className="img-fluid rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x400/cccccc/666666?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h3 className="fw-bold mb-3">{selectedMovie.tenPhim}</h3>
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td className="fw-bold" style={{ width: '120px' }}>Mã phim:</td>
                              <td>{selectedMovie.maPhim}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Đạo diễn:</td>
                              <td>{selectedMovie.daoDien}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Diễn viên:</td>
                              <td>{selectedMovie.dienVien}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Thời lượng:</td>
                              <td>{formatDuration(selectedMovie.thoiLuong)}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Ngày KC:</td>
                              <td>{formatDate(selectedMovie.ngayKhoiChieu)}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Độ tuổi:</td>
                              <td>{selectedMovie.tuoi}+</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">Trạng thái:</td>
                              <td>
                                <span className={`badge ${
                                  selectedMovie.trangThai === 'Đang chiếu' ? 'bg-success' :
                                  selectedMovie.trangThai === 'Sắp chiếu' ? 'bg-warning' :
                                  'bg-secondary'
                                }`}>
                                  {selectedMovie.trangThai}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {selectedMovie.moTa && (
                          <div className="mt-3">
                            <h6 className="fw-bold">Mô tả:</h6>
                            <p>{selectedMovie.moTa}</p>
                          </div>
                        )}
                        {selectedMovie.trailerURL && (
                          <div className="mt-3">
                            <a 
                              href={selectedMovie.trailerURL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                            >
                              <i className="bi bi-play-circle me-2"></i>
                              Xem Trailer
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tên phim *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={formData.tenPhim}
                            onChange={(e) => setFormData({...formData, tenPhim: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Đạo diễn *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={formData.daoDien}
                            onChange={(e) => setFormData({...formData, daoDien: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Diễn viên</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            value={formData.dienVien}
                            onChange={(e) => setFormData({...formData, dienVien: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Thể loại *</label>
                          <select
                            className="form-select"
                            multiple
                            value={formData.theLoai}
                            onChange={e => {
                              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                              setFormData({ ...formData, theLoai: selected });
                            }}
                            required
                          >
                            {categories.map(cat => (
                              <option key={cat.maTheLoai} value={cat.maTheLoai}>{cat.tenTheLoai}</option>
                            ))}
                          </select>
                          <small className="text-muted">Giữ Ctrl để chọn nhiều thể loại</small>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="mb-3">
                              <label className="form-label">Thời lượng (phút) *</label>
                              <input 
                                type="number" 
                                className="form-control" 
                                value={formData.thoiLuong}
                                onChange={(e) => setFormData({...formData, thoiLuong: e.target.value})}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-3">
                              <label className="form-label">Độ tuổi *</label>
                              <select 
                                className="form-select"
                                value={formData.tuoi}
                                onChange={(e) => setFormData({...formData, tuoi: e.target.value})}
                                required
                              >
                                <option value="">Chọn độ tuổi</option>
                                <option value="0">0+</option>
                                <option value="13">13+</option>
                                <option value="16">16+</option>
                                <option value="18">18+</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Ngày khởi chiếu *</label>
                          <input 
                            type="date" 
                            className="form-control" 
                            value={formData.ngayKhoiChieu}
                            onChange={(e) => setFormData({...formData, ngayKhoiChieu: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Trạng thái *</label>
                          <select 
                            className="form-select"
                            value={formData.trangThai}
                            onChange={(e) => setFormData({...formData, trangThai: e.target.value})}
                            required
                          >
                            <option value="Sắp chiếu">Sắp chiếu</option>
                            <option value="Đang chiếu">Đang chiếu</option>
                            <option value="Đã chiếu">Đã chiếu</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">URL Hình ảnh</label>
                          <input 
                            type="url" 
                            className="form-control" 
                            value={formData.hinhAnh}
                            onChange={(e) => setFormData({...formData, hinhAnh: e.target.value})}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">URL Trailer</label>
                          <input 
                            type="url" 
                            className="form-control" 
                            value={formData.trailerURL}
                            onChange={(e) => setFormData({...formData, trailerURL: e.target.value})}
                            placeholder="https://youtube.com/watch?v=..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mô tả</label>
                      <textarea 
                        className="form-control" 
                        rows="4"
                        value={formData.moTa}
                        onChange={(e) => setFormData({...formData, moTa: e.target.value})}
                        placeholder="Mô tả về nội dung phim..."
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Hủy
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {modalType === 'add' ? 'Thêm phim' : 'Cập nhật'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieManagement;