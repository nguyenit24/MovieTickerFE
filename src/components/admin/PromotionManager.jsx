import React, { useState } from 'react';
import { Ticket, Plus, Edit2, Trash2, Search, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react';
import MovieManagement from "./MovieManagement.jsx";
import foodService from "../../services/foodService.js";
import categoryService from "../../services/categoryService.js";
import promotionService from "../../services/promotionService.js";

const PromotionManager = () => {
    const [activeTab, setActiveTab] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        description: '',
        discount: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
        image: ''
    });

    const fetchPromotions = async () => {
        const result = await promotionService.getAllPromotion();
        if (result.success) setPromotions(result.data);
    }

    useState(() => {
        fetchPromotions();
    }, [])


    const [editingId, setEditingId] = useState(null);

    const filteredPromotions = promotions.filter(promo =>
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activePromotions = promotions.filter(p => p.status === 'active').length;
    const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0);
    const avgUsageRate = promotions.length > 0
        ? (promotions.reduce((sum, p) => sum + (p.usageCount / p.usageLimit * 100), 0) / promotions.length).toFixed(1)
        : 0;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            setPromotions(promotions.map(promo =>
                promo.id === editingId
                    ? { ...promo, ...formData, usageCount: promo.usageCount }
                    : promo
            ));
            setEditingId(null);
        } else {
            const  result = await promotionService.createPromotion(formData)
            if (result.success) {
                setPromotions([...promotions, result.data]);
                alert("Thêm mới thành công");
            } else {
                alert(result.message);
            }
        }

        setFormData({
            maKm: '',
            tenKm: '',
            moTa: '',
            giaTri: '',
            ngayBatDau: '',
            ngayKetThuc: '',
            maCode: '',
            soLuong: '',
            urlHinh: ''
        });
        setActiveTab('list');
    };

    const handleEdit = (promo) => {
        setFormData({
            maKm : promo.maKm,
            tenKm: promo.tenKm,
            moTa: promo.moTa,
            giaTri: promo.giaTri,
            ngayBatDau: promo.ngayBatDau,
            ngayKetThuc: promo.ngayKetThuc,
            soLuong: promo.soLuong,
            urlHinh: promo.urlHinh
        });
        setEditingId(promo.maKm);
        setActiveTab('form');
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
            setPromotions(promotions.filter(promo => promo.id !== id));
        }
    };

    const handleCancel = () => {
        setFormData({
            maKm: null,
            tenKm: '',
            moTa: '',
            giaTri: '',
            ngayBatDau: '',
            ngayKetThuc: '',
            maCode: '',
            soLuong: '',
            urlHinh: ''
        });
        setEditingId(null);
        setActiveTab('list');
    };

    return (
        <div className="min-vh-100 bg-light">
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />

            <nav className="navbar navbar-dark bg-danger shadow-sm">
                <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 d-flex align-items-center">
            <Ticket className="me-2" size={28} />
            Quản Lý Khuyến Mãi Rạp Chiếu Phim
          </span>
                </div>
            </nav>

            <div className="container-fluid p-4">
                <div className="row mb-4">
                    <div className="col-md-3 mb-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-1 small">Tổng Khuyến Mãi</p>
                                        <h3 className="mb-0">{promotions.length}</h3>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-2 rounded">
                                        <Ticket className="text-primary" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-1 small">Đang Hoạt Động</p>
                                        <h3 className="mb-0 text-success">{activePromotions}</h3>
                                    </div>
                                    <div className="bg-success bg-opacity-10 p-2 rounded">
                                        <TrendingUp className="text-success" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-1 small">Tổng Lượt Dùng</p>
                                        <h3 className="mb-0">{totalUsage.toLocaleString()}</h3>
                                    </div>
                                    <div className="bg-warning bg-opacity-10 p-2 rounded">
                                        <Users className="text-warning" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-1 small">Tỷ Lệ Sử Dụng TB</p>
                                        <h3 className="mb-0">{avgUsageRate}%</h3>
                                    </div>
                                    <div className="bg-info bg-opacity-10 p-2 rounded">
                                        <DollarSign className="text-info" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 pt-3">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'list' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('list')}
                                >
                                    Danh Sách Khuyến Mãi
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'form' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('form')}
                                >
                                    <Plus size={16} className="me-1" />
                                    {editingId ? 'Chỉnh Sửa' : 'Thêm Mới'}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="card-body">
                        {activeTab === 'list' && (
                            <div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="input-group">
                      <span className="input-group-text bg-white">
                        <Search size={18} />
                      </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tìm kiếm theo tên hoặc mã khuyến mãi..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                        <tr>
                                            <th style={{width: '50px'}}>ID</th>
                                            <th>Hình Ảnh</th>
                                            <th>Tên Khuyến Mãi</th>
                                            <th>Mã Code</th>
                                            <th>Giảm Giá</th>
                                            <th>Thời Gian</th>
                                            <th>Sử Dụng</th>
                                            <th>Trạng Thái</th>
                                            <th style={{width: '120px'}}>Thao Tác</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredPromotions.map(promo => (
                                            <tr key={promo.id}>
                                                <td>{promo.id}</td>
                                                <td>
                                                    <img
                                                        src={promo.image}
                                                        alt={promo.title}
                                                        className="rounded"
                                                        style={{width: '80px', height: '50px', objectFit: 'cover'}}
                                                    />
                                                </td>
                                                <td>
                                                    <strong>{promo.title}</strong>
                                                    <br />
                                                    <small className="text-muted">{promo.description}</small>
                                                </td>
                                                <td>
                                                    <code className="bg-light px-2 py-1 rounded">{promo.code}</code>
                                                </td>
                                                <td>
                            <span className="badge bg-danger">
                              {promo.type === 'percentage' ? `${promo.discount}%` : `${promo.discount.toLocaleString()}đ`}
                            </span>
                                                </td>
                                                <td>
                                                    <small>
                                                        <Calendar size={14} className="me-1" />
                                                        {promo.startDate} đến {promo.endDate}
                                                    </small>
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-column">
                                                        <small>{promo.usageCount} / {promo.usageLimit}</small>
                                                        <div className="progress" style={{height: '4px'}}>
                                                            <div
                                                                className="progress-bar bg-success"
                                                                style={{width: `${(promo.usageCount / promo.usageLimit) * 100}%`}}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                            <span className={`badge ${promo.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                              {promo.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                            </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-1"
                                                        onClick={() => handleEdit(promo)}
                                                        title="Chỉnh sửa"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(promo.id)}
                                                        title="Xóa"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'form' && (
                            <div onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label">Tên Khuyến Mãi *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="VD: Giảm 50% Vé Xem Phim"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Mô Tả *</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows="3"
                                                required
                                                placeholder="Mô tả chi tiết về chương trình khuyến mãi"
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Mã Code *</label>
                                                <input
                                                    type="text"
                                                    className="form-control text-uppercase"
                                                    name="code"
                                                    value={formData.code}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="VD: CINEMA50"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Loại Giảm Giá</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value="Phần Trăm (%)"
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Giá Trị Giảm *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="discount"
                                                    value={formData.discount}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder= '50'
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Giới Hạn Sử Dụng *</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="usageLimit"
                                                    value={formData.usageLimit}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="1000"
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Ngày Bắt Đầu *</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Ngày Kết Thúc *</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">URL Hình Ảnh *</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card bg-light border-0">
                                            <div className="card-body">
                                                <h6 className="card-title">Preview</h6>
                                                {formData.image && (
                                                    <img
                                                        src={formData.image}
                                                        alt="Preview"
                                                        className="img-fluid rounded mb-3"
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                )}
                                                <p className="mb-1"><strong>{formData.title || 'Tên khuyến mãi'}</strong></p>
                                                <p className="small text-muted mb-2">{formData.description || 'Mô tả...'}</p>
                                                {formData.code && (
                                                    <code className="bg-white px-2 py-1 rounded d-inline-block mb-2">
                                                        {formData.code}
                                                    </code>
                                                )}
                                                {formData.discount && (
                                                    <div>
                            <span className="badge bg-danger">
                              Giảm {`${formData.discount}%`}
                            </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-2 mt-4">
                                    <button type="button" onClick={handleSubmit} className="btn btn-danger">
                                        <Plus size={18} className="me-1" />
                                        {editingId ? 'Cập Nhật' : 'Thêm Khuyến Mãi'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionManager;