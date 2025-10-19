import React, { useEffect, useState } from 'react';
import categoryService from '../../services/categoryService';
import {Film, ChartBar, Plus} from "lucide-react";

const CategoryManager = () =>
{
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ tenTheLoai: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    const result = await categoryService.getAllCategoriesPaginable(page);
    try {
      if (result.success) {
        const { currentGens, totalPages, currentPage } = result.data;
        setCategories(currentGens);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      } else {
        setCategories([]);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
      setCategories([]); // Sửa lại cho đúng
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
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
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary text-white p-3 rounded">
                            <ChartBar size={32}/>
                        </div>
                        <div>
                            <h1 className="mb-0 h3">Quản Lý thể loại phim</h1>
                            <p className="text-muted mb-0">Hệ thống quản lý rạp chiếu phim</p>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => openModal('add', null)}
                    >
                        <Plus size={20} className="me-2" style={{verticalAlign: 'middle'}}/>
                        Thêm Suất Chiếu
                    </button>
                </div>
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
                            <th style={{ width: '40px' }}>STT</th>
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

        {/* Pagination giữ nguyên */}
        {totalPages && totalPages > 1 && (
            <div className="card-footer bg-white mt-4">
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
