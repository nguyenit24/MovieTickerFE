import React, { useEffect, useState } from 'react';
import categoryService from '../../services/categoryService';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ tenTheLoai: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const result = await categoryService.getAllCategories();
    if (result.success) setCategories(result.data);
    setLoading(false);
  };

  const openModal = (type, category = null) => {
    setModalType(type);
    setSelectedCategory(category);
    setFormData({ tenTheLoai: category ? category.tenTheLoai : '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedCategory(null);
    setFormData({ tenTheLoai: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const result = await categoryService.createCategory(formData);
      if (result.success) {
        fetchCategories();
        closeModal();
      } else {
        alert(result.message);
      }
    } else if (modalType === 'edit') {
      const result = await categoryService.updateCategory(selectedCategory.maTheLoai, formData);
      if (result.success) {
        fetchCategories();
        closeModal();
      } else {
        alert(result.message);
      }
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Bạn có chắc muốn xóa thể loại này?')) {
      const result = await categoryService.deleteCategory(categoryId);
      if (result.success) {
        fetchCategories();
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="h4 text-primary fw-bold">
            <i className="bi bi-tags me-2"></i>Quản lý thể loại phim
          </h2>
          <button className="btn btn-primary" onClick={() => openModal('add')}>
            <i className="bi bi-plus-circle me-2"></i>Thêm thể loại
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
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Tên thể loại</th>
                  <th style={{ width: '160px' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.maTheLoai}>
                    <td>{idx + 1}</td>
                    <td>{cat.tenTheLoai}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => openModal('edit', cat)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.maTheLoai)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  {modalType === 'add' ? 'Thêm thể loại' : 'Chỉnh sửa thể loại'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên thể loại *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.tenTheLoai}
                      onChange={e => setFormData({ tenTheLoai: e.target.value })}
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

export default CategoryManager;
