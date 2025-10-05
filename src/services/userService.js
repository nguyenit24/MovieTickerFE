// User Service - Quản lý tất cả API calls liên quan đến người dùng
const API_BASE_URL = 'http://localhost:8080/api';

class UserService {
  // Lấy danh sách tất cả người dùng
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllUsers:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy chi tiết người dùng theo ID
  async getUserById(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getUserById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Đăng nhập
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        // Lưu token vào localStorage
        if (result.data.token) {
          localStorage.setItem('authToken', result.data.token);
        }
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API login:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('authToken');
    return { success: true };
  }

  // Kiểm tra đã đăng nhập
  isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
  }

  // Tạo người dùng mới
  async createUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(userData)
      });
      
      const result = await response.json();
      
      if (result.code === 201) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createUser:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật thông tin người dùng
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(userData)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateUser:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa người dùng
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, message: 'Xóa người dùng thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteUser:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

// Export singleton instance
export default new UserService();