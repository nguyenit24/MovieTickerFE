import React, { useState, useEffect } from 'react';
import { Edit, Trash2, ChevronLeft, ChevronRight, Plus, Eye, X, Upload, Film } from 'lucide-react';

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [formData, setFormData] = useState({
    tenPhim: '',
    moTa: '',
    daoDien: '',
    dienVien: '',
    thoiLuong: '',
    ngayKhoiChieu: '',
    hinhAnh: null,
    trailerURL: '',
    tuoi: '',
    trangThai: 'Sắp chiếu',
    theLoaiIds: []
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch movies
  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/phim');
      const result = await response.json();
      
      if (result.code === 200) {
        setMovies(result.data);
      }
    } catch (error) {
      console.error('Lỗi kết nối API:', error);
      // Sample data for demo
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
          listTheLoai: [{ maTheLoai: "TL001", tenTheLoai: "Hành động" }, { maTheLoai: "TL002", tenTheLoai: "Anime" }]
        },
        {
          maPhim: "P002",
          tenPhim: "Inception",
          moTa: "Phim khoa học viễn tưởng về giấc mơ",
          daoDien: "Christopher Nolan",
          dienVien: "Leonardo DiCaprio, Marion Cotillard",
          thoiLuong: 148,
          ngayKhoiChieu: "2024-11-20",
          hinhAnh: "https://via.placeholder.com/300x450/3B82F6/ffffff?text=Inception",
          trailerURL: "https://youtube.com/watch?v=example2",
          tuoi: 16,
          trangThai: "Đang chiếu",
          listTheLoai: [{ maTheLoai: "TL003", tenTheLoai: "Khoa học viễn tưởng" }]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/theloai');
      const result = await response.json();
      
      if (result.code === 200) {
        setGenres(result.data);
      }
    } catch (error) {
      console.error('Lỗi kết nối API thể loại:', error);
      // Sample genres for demo
      setGenres([
        { maTheLoai: "TL001", tenTheLoai: "Hành động" },
        { maTheLoai: "TL002", tenTheLoai: "Anime" },
        { maTheLoai: "TL003", tenTheLoai: "Khoa học viễn tưởng" },
        { maTheLoai: "TL004", tenTheLoai: "Kinh dị" },
        { maTheLoai: "TL005", tenTheLoai: "Hài" },
        { maTheLoai: "TL006", tenTheLoai: "Tình cảm" }
      ]);
    }
  };

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchSearch = movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       movie.daoDien.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGenre = !selectedGenre || movie.listTheLoai.some(genre => genre.tenTheLoai === selectedGenre);
    const matchYear = !selectedYear || new Date(movie.ngayKhoiChieu).getFullYear().toString() === selectedYear;
    
    return matchSearch && matchGenre && matchYear;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const allGenres = [...new Set(movies.flatMap(movie => movie.listTheLoai.map(genre => genre.tenTheLoai)))];
  const allYears = [...new Set(movies.map(movie => new Date(movie.ngayKhoiChieu).getFullYear()))].sort((a, b) => b - a);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, hinhAnh: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleView = (movie) => {
    setSelectedMovie(movie);
    setShowViewModal(true);
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      tenPhim: movie.tenPhim,
      moTa: movie.moTa,
      daoDien: movie.daoDien,
      dienVien: movie.dienVien,
      thoiLuong: movie.thoiLuong,
      ngayKhoiChieu: movie.ngayKhoiChieu,
      hinhAnh: null,
      trailerURL: movie.trailerURL || '',
      tuoi: movie.tuoi,
      trangThai: movie.trangThai,
      theLoaiIds: movie.listTheLoai.map(g => g.maTheLoai)
    });
    setImagePreview(movie.hinhAnh);
    setShowEditModal(true);
  };

  const handleDelete = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    setFormData({
      tenPhim: '',
      moTa: '',
      daoDien: '',
      dienVien: '',
      thoiLuong: '',
      ngayKhoiChieu: '',
      hinhAnh: null,
      trailerURL: '',
      tuoi: 13,
      trangThai: 'Sắp chiếu',
      theLoaiIds: []
    });
    setImagePreview(null);
    setShowAddModal(true);
  };

  const closeAllModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedMovie(null);
    setImagePreview(null);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    console.log('Thêm phim mới:', formData);
    // Call API thêm phim
    closeAllModals();
    fetchMovies();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    console.log('Cập nhật phim:', selectedMovie.maPhim, formData);
    // Call API cập nhật phim
    closeAllModals();
    fetchMovies();
  };

  const confirmDelete = async () => {
    console.log('Xóa phim:', selectedMovie.maPhim);
    // Call API xóa phim
    closeAllModals();
    fetchMovies();
  };

  const handleGenreChange = (maTheLoai) => {
    const currentIds = formData.theLoaiIds;
    const newIds = currentIds.includes(maTheLoai)
      ? currentIds.filter(id => id !== maTheLoai)
      : [...currentIds, maTheLoai];
    setFormData({ ...formData, theLoaiIds: newIds });
  };

  // Modal Components
  const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden`}>
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {children}
          </div>
        </div>
      </div>
    );
  };

 const ViewModal = () => (
  <Modal 
    isOpen={showViewModal} 
    onClose={closeAllModals} 
    title="Chi tiết phim" 
    size="full"
    className="view-modal"
  >
    {selectedMovie && (
      <div className="p-8 bg-white">
        <div className="grid grid-cols-12 gap-8 h-full">
          {/* Left side - Movie Image */}
          <div className="col-span-4">
            <div className="sticky top-0">
              <img 
                src={selectedMovie.hinhAnh || 'https://via.placeholder.com/400x600/cccccc/666666?text=No+Image'} 
                alt={selectedMovie.tenPhim}
                className="w-full rounded-xl shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/cccccc/666666?text=No+Image';
                }}
              />
              
              {/* Movie Title */}
              <h2 className="text-3xl font-bold mt-6 text-center text-gray-800">{selectedMovie.tenPhim}</h2>
              
              {/* Genre Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {selectedMovie.listTheLoai?.map((genre, i) => (
                  <span 
                    key={i} 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-3 py-1 rounded-full font-medium shadow-md"
                  >
                    {genre.tenTheLoai}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Movie Details Table */}
          <div className="col-span-8">
            <div className="bg-gray-50 rounded-xl p-6 h-full">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">Thông tin chi tiết</h3>
              
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800 w-1/3">Mã phim</th>
                    <td className="py-4 px-6 text-lg">{selectedMovie.maPhim}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Đạo diễn</th>
                    <td className="py-4 px-6 text-lg">{selectedMovie.daoDien}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Diễn viên</th>
                    <td className="py-4 px-6 text-lg">{selectedMovie.dienVien}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Thời lượng</th>
                    <td className="py-4 px-6 text-lg font-semibold text-blue-600">{formatDuration(selectedMovie.thoiLuong)}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Ngày khởi chiếu</th>
                    <td className="py-4 px-6 text-lg">{formatDate(selectedMovie.ngayKhoiChieu)}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Độ tuổi</th>
                    <td className="py-4 px-6 text-lg">
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">{selectedMovie.tuoi}+</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Trạng thái</th>
                    <td className="py-4 px-6 text-lg">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                        selectedMovie.trangThai === 'Đang chiếu' ? 'bg-green-100 text-green-800' :
                        selectedMovie.trangThai === 'Sắp chiếu' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedMovie.trangThai}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Mô tả</th>
                    <td className="py-4 px-6 text-lg leading-relaxed">{selectedMovie.moTa}</td>
                  </tr>
                  {selectedMovie.trailerURL && (
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="bg-gradient-to-r from-gray-100 to-gray-200 py-4 px-6 text-left font-bold text-gray-800">Trailer</th>
                      <td className="py-4 px-6 text-lg">
                        <a 
                          href={selectedMovie.trailerURL} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
                        >
                          🎬 Xem trailer
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )}
  </Modal>
);

  const FormModal = ({ isEdit }) => (
    <Modal 
      isOpen={isEdit ? showEditModal : showAddModal} 
      onClose={closeAllModals} 
      title={isEdit ? "Chỉnh sửa phim" : "Thêm phim mới"} 
      size="xl"
    >
      <form onSubmit={isEdit ? handleSubmitEdit : handleSubmitAdd}>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Image Upload */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh phim</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full rounded-lg mb-2" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, hinhAnh: null });
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Tải lên hình ảnh</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 inline-block text-sm"
                >
                  Chọn file
                </label>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên phim <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.tenPhim}
                  onChange={(e) => setFormData({ ...formData, tenPhim: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên phim..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mô tả phim..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đạo diễn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.daoDien}
                    onChange={(e) => setFormData({ ...formData, daoDien: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tên đạo diễn..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diễn viên</label>
                  <input
                    type="text"
                    value={formData.dienVien}
                    onChange={(e) => setFormData({ ...formData, dienVien: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tên diễn viên..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời lượng (phút) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.thoiLuong}
                    onChange={(e) => setFormData({ ...formData, thoiLuong: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Độ tuổi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.tuoi}
                    onChange={(e) => setFormData({ ...formData, tuoi: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn</option>
                    <option value="0">P - Mọi lứa tuổi</option>
                    <option value="13">T13 - Từ 13 tuổi</option>
                    <option value="16">T16 - Từ 16 tuổi</option>
                    <option value="18">T18 - Từ 18 tuổi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.trangThai}
                    onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Sắp chiếu">Sắp chiếu</option>
                    <option value="Đang chiếu">Đang chiếu</option>
                    <option value="Ngừng chiếu">Ngừng chiếu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày khởi chiếu <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.ngayKhoiChieu}
                  onChange={(e) => setFormData({ ...formData, ngayKhoiChieu: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Trailer</label>
                <input
                  type="url"
                  value={formData.trailerURL}
                  onChange={(e) => setFormData({ ...formData, trailerURL: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thể loại <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {genres.map(genre => (
                    <label key={genre.maTheLoai} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={formData.theLoaiIds.includes(genre.maTheLoai)}
                        onChange={() => handleGenreChange(genre.maTheLoai)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{genre.tenTheLoai}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
          <button
            type="button"
            onClick={closeAllModals}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            {isEdit ? 'Cập nhật' : 'Thêm phim'}
          </button>
        </div>
      </form>
    </Modal>
  );

  const DeleteModal = () => (
    <Modal isOpen={showDeleteModal} onClose={closeAllModals} title="Xác nhận xóa" size="sm">
      {selectedMovie && (
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <p className="text-center text-gray-900 mb-2">
            Bạn có chắc chắn muốn xóa phim
          </p>
          <p className="text-center font-bold text-gray-900 mb-4">
            "{selectedMovie.tenPhim}"?
          </p>
          <p className="text-center text-sm text-gray-600 mb-6">
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex gap-3">
            <button
              onClick={closeAllModals}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              Hủy
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Xóa phim
            </button>
          </div>
        </div>
      )}
    </Modal>
  );

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quản lý phim</h2>
            <p className="text-gray-600">Quản lý danh sách phim và thông tin chi tiết</p>
          </div>
          <button 
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Thêm phim mới
          </button>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Tất cả thể loại</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Tất cả năm</option>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="md:col-span-2">
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên phim, đạo diễn..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Tìm thấy <span className="font-semibold text-gray-900">{filteredMovies.length}</span> phim
            </div>
            {(searchTerm || selectedGenre || selectedYear) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('');
                  setSelectedYear('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Đang tải danh sách phim...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hình ảnh</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tên phim</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Đạo diễn</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thời lượng</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ngày KC</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thể loại</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentMovies.length > 0 ? currentMovies.map((movie, idx) => (
                    <tr key={movie.maPhim} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <img 
                          src={movie.hinhAnh || '/default-movie.jpg'} 
                          alt={movie.tenPhim}
                          className="w-14 h-20 object-cover rounded-lg shadow-md hover:scale-110 transition-transform cursor-pointer"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x150/cccccc/666666?text=No+Image';
                          }}
                          onClick={() => handleView(movie)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 mb-1">{movie.tenPhim}</div>
                        <div className="text-xs text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
                          Độ tuổi: {movie.tuoi}+
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{movie.daoDien}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatDuration(movie.thoiLuong)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatDate(movie.ngayKhoiChieu)}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {movie.listTheLoai.slice(0, 2).map((genre, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                              {genre.tenTheLoai}
                            </span>
                          ))}
                          {movie.listTheLoai.length > 2 && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                              +{movie.listTheLoai.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          movie.trangThai === 'Đang chiếu' ? 'bg-green-100 text-green-700' :
                          movie.trangThai === 'Sắp chiếu' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {movie.trangThai}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button 
                            className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors group"
                            title="Xem chi tiết"
                            onClick={() => handleView(movie)}
                          >
                            <Eye className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                          </button>
                          <button 
                            className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors group"
                            title="Chỉnh sửa"
                            onClick={() => handleEdit(movie)}
                          >
                            <Edit className="w-4 h-4 text-yellow-600 group-hover:scale-110 transition-transform" />
                          </button>
                          <button 
                            className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors group"
                            title="Xóa"
                            onClick={() => handleDelete(movie)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-12 text-center">
                        <Film className="w-16 h-16 mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-600 font-medium">Không tìm thấy phim nào</p>
                        <p className="text-gray-500 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
                <div className="text-sm text-gray-600">
                  Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredMovies.length)} trong tổng số {filteredMovies.length} phim
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button 
                        key={pageNum}
                        className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'border border-gray-300 hover:bg-white text-gray-700'
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    className="p-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <ViewModal />
      <FormModal isEdit={false} />
      <FormModal isEdit={true} />
      <DeleteModal />
    </div>
  );
};

export default MovieManagement;