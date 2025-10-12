// Service API cho quản lý thể loại phim
const API_BASE_URL = 'http://localhost:8080/api';
const token = localStorage.getItem("accessToken");
class CategoryService {
  // Lấy danh sách thể loại
  async getAllCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/theloai`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllCategories:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy chi tiết thể loại theo ID
  async getCategoryById(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/theloai/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getCategoryById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Thêm thể loại mới
  async createCategory(categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/theloai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });
      const result = await response.json();
      if (result.code === 201 || result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createCategory:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật thể loại
  async updateCategory(categoryId, categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/theloai/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData)
      });
      const result = await response.json();
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateCategory:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa thể loại
  async deleteCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/theloai/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        return { success: true, message: 'Xóa thể loại thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteCategory:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

export default new CategoryService();