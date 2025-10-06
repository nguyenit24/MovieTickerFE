import React, { useEffect, useState } from 'react';
import roomService from '../../services/roomService';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({ tenPhong: '' });

  useEffect(() => {
    fetchRooms(currentPage);
  }, [currentPage]);

  const fetchRooms = async (page) => {
    setLoading(true);
    const result = await roomService.getRoomsPaginated(page);
    if (result.success) {
      setRooms(result.data.currentItems);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.currentPage);
    }
    setLoading(false);
  };

  const openModal = (type, room = null) => {
    setModalType(type);
    setSelectedRoom(room);
    setFormData({ tenPhong: room ? room.tenPhong : '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedRoom(null);
    setFormData({ tenPhong: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const result = await roomService.createRoom(formData);
      if (result.success) {
        fetchRooms(currentPage);
        closeModal();
      } else {
        alert(result.message);
      }
    } else if (modalType === 'edit') {
      const result = await roomService.updateRoom(selectedRoom.maPhongChieu, formData);
      if (result.success) {
        fetchRooms(currentPage);
        closeModal();
      } else {
        alert(result.message);
      }
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm('Bạn có chắc muốn xóa phòng chiếu này?')) {
      const result = await roomService.deleteRoom(roomId);
      if (result.success) {
        fetchRooms(currentPage);
      } else {
        alert(result.message);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
            <i className="bi bi-house me-2"></i>Quản lý phòng chiếu
          </h2>
          <button className="btn btn-primary" onClick={() => openModal('add')}>
            <i className="bi bi-plus-circle me-2"></i>Thêm phòng chiếu
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
                    <th>Mã phòng</th>
                    <th>Tên phòng</th>
                    <th>Số lượng ghế</th>
                    <th style={{ width: '160px' }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, idx) => (
                    <tr key={room.maPhongChieu}>
                      <td>{(currentPage - 1) * 10 + idx + 1}</td>
                      <td>{room.maPhongChieu}</td>
                      <td>{room.tenPhong}</td>
                      <td>{room.soLuongGhe}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => openModal('edit', room)}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(room.maPhongChieu)}>
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
                  {modalType === 'add' ? 'Thêm phòng chiếu' : 'Chỉnh sửa phòng chiếu'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên phòng chiếu *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.tenPhong}
                      onChange={e => setFormData({ ...formData, tenPhong: e.target.value })}
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

export default RoomManager;