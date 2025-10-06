import React, { useEffect, useState } from 'react';
import scheduleService from '../../services/scheduleService';
import roomService from '../../services/roomService';

const ScheduleManager = () => {
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    donGiaCoSo: 90000,
    thoiGianBatDau: '',
    maPhim: '',
    maPhongChieu: ''
  });

  useEffect(() => {
    fetchSchedules(currentPage);
    fetchRooms();
    fetchMovies();
  }, [currentPage]);

  const fetchSchedules = async (page) => {
    setLoading(true);
    const result = await scheduleService.getSchedulesPaginated(page);
    if (result.success) {
      setSchedules(result.data.currentItems);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.currentPage);
    }
    setLoading(false);
  };

  const fetchRooms = async () => {
    const result = await roomService.getAllRooms();
    if (result.success) {
      setRooms(result.data);
    }
  };

  const fetchMovies = async () => {
    const result = await scheduleService.getMoviesForSchedule();
    if (result.success) {
      setMovies(result.data);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatISODateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toISOString().slice(0, 16);
  };

  const openModal = (type, schedule = null) => {
    setModalType(type);
    setSelectedSchedule(schedule);
    
    if (schedule) {
      setFormData({
        donGiaCoSo: schedule.donGiaCoSo,
        thoiGianBatDau: formatISODateTime(schedule.thoiGianBatDau),
        maPhim: schedule.maPhim || '',
        maPhongChieu: schedule.phongChieu.maPhongChieu
      });
    } else {
      setFormData({
        donGiaCoSo: 90000,
        thoiGianBatDau: '',
        maPhim: movies.length > 0 ? movies[0].maPhim : '',
        maPhongChieu: rooms.length > 0 ? rooms[0].maPhongChieu : ''
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedSchedule(null);
    setFormData({
      donGiaCoSo: 90000,
      thoiGianBatDau: '',
      maPhim: '',
      maPhongChieu: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      const result = await scheduleService.createSchedule(formData);
      if (result.success) {
        fetchSchedules(currentPage);
        closeModal();
      } else {
        alert(result.message || 'Có lỗi xảy ra khi thêm suất chiếu');
      }
    } else if (modalType === 'edit') {
      const result = await scheduleService.updateSchedule(selectedSchedule.maSuatChieu, formData);
      if (result.success) {
        fetchSchedules(currentPage);
        closeModal();
      } else {
        alert(result.message || 'Có lỗi xảy ra khi cập nhật suất chiếu');
      }
    }
  };

  const handleDelete = async (scheduleId) => {
    if (window.confirm('Bạn có chắc muốn xóa suất chiếu này?')) {
      const result = await scheduleService.deleteSchedule(scheduleId);
      if (result.success) {
        fetchSchedules(currentPage);
      } else {
        alert(result.message || 'Có lỗi xảy ra khi xóa suất chiếu');
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const renderPagination = () => {
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
          </li>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="h4 text-primary fw-bold">
            <i className="bi bi-calendar3 me-2"></i>Quản lý suất chiếu
          </h2>
          <button className="btn btn-primary" onClick={() => openModal('add')}>
            <i className="bi bi-plus-circle me-2"></i>Thêm suất chiếu
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <>
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Mã suất chiếu</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Phòng chiếu</th>
                    <th>Đơn giá cơ sở</th>
                    <th style={{ width: '160px' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, idx) => (
                    <tr key={schedule.maSuatChieu}>
                      <td>{(currentPage - 1) * 10 + idx + 1}</td>
                      <td>{schedule.maSuatChieu}</td>
                      <td>{formatDateTime(schedule.thoiGianBatDau)}</td>
                      <td>{schedule.phongChieu.tenPhong}</td>
                      <td>{schedule.donGiaCoSo.toLocaleString('vi-VN')} VNĐ</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => openModal('edit', schedule)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(schedule.maSuatChieu)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && renderPagination()}
            </>
          )}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal show d-block modal-overlay">
          <div className="modal-dialog mx-auto">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'add' ? 'Thêm suất chiếu' : 'Chỉnh sửa suất chiếu'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Phim *</label>
                    <select
                      className="form-select"
                      name="maPhim"
                      value={formData.maPhim}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Chọn phim --</option>
                      {movies.map(movie => (
                        <option key={movie.maPhim} value={movie.maPhim}>
                          {movie.tenPhim}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phòng chiếu *</label>
                    <select
                      className="form-select"
                      name="maPhongChieu"
                      value={formData.maPhongChieu}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Chọn phòng --</option>
                      {rooms.map(room => (
                        <option key={room.maPhongChieu} value={room.maPhongChieu}>
                          {room.tenPhong}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Thời gian bắt đầu *</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="thoiGianBatDau"
                      value={formData.thoiGianBatDau}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Đơn giá cơ sở (VNĐ) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="donGiaCoSo"
                      value={formData.donGiaCoSo}
                      onChange={handleInputChange}
                      min="10000"
                      step="10000"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
                  <button type="submit" className="btn btn-primary">{modalType === 'add' ? 'Thêm' : 'Cập nhật'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManager;