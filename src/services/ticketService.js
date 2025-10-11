const API_BASE_URL = 'http://localhost:8080/api';

const ticketService = {
  // Đặt vé theo API mới
  bookTicket: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/ve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
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
          message: result.message || 'Lỗi khi đặt vé'
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

  // Lấy chi tiết hóa đơn
  getInvoiceDetail: async (maHD) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/detail/${maHD}`);
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
          message: result.message || 'Lỗi khi tải thông tin hóa đơn'
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

  // Tạo thanh toán VNPay
  createVNPayPayment: async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/vn_pay/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      const result = await response.json();
      
      if (result.code === 201) {
        return {
          success: true,
          data: result.data,
          message: result.message
        };
      } else {
        return {
          success: false,
          data: null,
          message: result.message || 'Lỗi khi tạo thanh toán'
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

  // Kiểm tra trạng thái thanh toán
  checkPaymentStatus: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/status/${orderId}`);
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
          message: result.message || 'Lỗi khi kiểm tra trạng thái'
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

  // Hủy hóa đơn
  cancelInvoice: async (maHD) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/cancel/${maHD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          message: result.message || 'Lỗi khi hủy hóa đơn'
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

  // Lấy danh sách hóa đơn của user
  getUserInvoices: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment/all`);
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
          message: result.message || 'Lỗi khi tải danh sách hóa đơn'
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

  // Alias for getUserInvoices để tương thích
  getUserTickets: async () => {
    return ticketService.getUserInvoices();
  }
};

export default ticketService;