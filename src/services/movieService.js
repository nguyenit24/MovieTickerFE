// Movie Service - Quản lý tất cả API calls liên quan đến phim
const API_BASE_URL = 'http://localhost:8080/api';

class MovieService {
  // Lấy danh sách tất cả phim
  async getAllMovies() {
    try {
      const response = await fetch(`${API_BASE_URL}/phim`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllMovies:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy chi tiết phim theo ID
  async getMovieById(movieId) {
    try {
      const response = await fetch(`${API_BASE_URL}/phim/${movieId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getMovieById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Thêm phim mới
  async createMovie(movieData) {
    try {
      const response = await fetch(`${API_BASE_URL}/phim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData)
      });
      
      const result = await response.json();
      
      if (result.code === 200 || result.code === 201) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createMovie:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật phim
  async updateMovie(movieId, movieData) {
    try {
      const response = await fetch(`${API_BASE_URL}/phim/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateMovie:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa phim
  async deleteMovie(movieId) {
    try {
      const response = await fetch(`${API_BASE_URL}/phim/${movieId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, message: 'Xóa phim thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteMovie:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Tìm kiếm phim theo từ khóa
  async searchMovies(keyword) {
    try {
      const response = await fetch(`${API_BASE_URL}/phim/search?keyword=${encodeURIComponent(keyword)}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API searchMovies:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thống kê phim cho dashboard
  async getMovieStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/phim/stats`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        // Fallback data nếu API không có endpoint stats
        const allMovies = await this.getAllMovies();
        if (allMovies.success) {
          const movies = allMovies.data;
          const stats = {
            totalMovies: movies.length,
            nowShowing: movies.filter(m => m.trangThai === 'Đang chiếu').length,
            comingSoon: movies.filter(m => m.trangThai === 'Sắp chiếu').length,
            ended: movies.filter(m => m.trangThai === 'Đã chiếu').length
          };
          return { success: true, data: stats };
        }
        return { success: false, message: 'Không thể lấy thống kê' };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getMovieStats:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Upload ảnh phim
  async uploadMovieImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API uploadMovieImage:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

// Export singleton instance
export default new MovieService();