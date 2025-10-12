const API_BASE_URL = 'http://localhost:8080/api';
const token = localStorage.getItem("accessToken");
const serviceService = {
  // Lấy danh sách dịch vụ đi kèm
  getAllServices: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dichvudikem`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.code === 200) {
        return {
          success: true,
          data: result.data || [],
          message: result.message
        };
      } else {
        return {
          success: false,
          data: [],
          message: result.message || 'Lỗi khi tải danh sách dịch vụ'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Lỗi kết nối server'
      };
    }
  },

  // Lấy chi tiết dịch vụ
  getServiceById: async (maDichVu) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dichvudikem/${maDichVu}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.code === 200) {
        return {
          success: true,
          data: result.data,
          message: result.message
        };
      } else {
        return {
          success: false,
          data: null,
          message: result.message || 'Lỗi khi tải thông tin dịch vụ'
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Lỗi kết nối server'
      };
    }
  }
};

export default serviceService;