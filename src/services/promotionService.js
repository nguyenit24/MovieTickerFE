const API_BASE_URL = 'http://localhost:8080/api';
const token = localStorage.getItem("accessToken");
const promotionService = {
  // Kiểm tra khuyến mãi có hợp lệ không
  validatePromotion: async (maKhuyenMai) => {
    try {
      const response = await fetch(`${API_BASE_URL}/khuyenmai/validate/${maKhuyenMai}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.code === 200) {
        return {
          success: true,
          data: { maKhuyenMai: result.data },
          message: result.message
        };
      } else {
        return {
          success: false,
          data: null,
          message: result.message
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Lỗi kết nối server'
      };
    }
  },

  // Lấy chi tiết khuyến mãi
  getPromotionDetail: async (maKhuyenMai) => {
    try {
      const response = await fetch(`${API_BASE_URL}/khuyenmai/${maKhuyenMai}`, {
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
          message: result.message
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

export default promotionService;