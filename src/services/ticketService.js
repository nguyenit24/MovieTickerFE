// Service API cho quản lý vé và doanh thu
const API_BASE_URL = 'http://localhost:8080/api';

class TicketService {
  // Lấy danh sách loại vé
  async getAllTicketTypes() {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket-types`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllTicketTypes:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy chi tiết loại vé
  async getTicketTypeById(ticketTypeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket-types/${ticketTypeId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getTicketTypeById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Thêm loại vé mới
  async createTicketType(ticketTypeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket-types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(ticketTypeData)
      });
      
      const result = await response.json();
      
      if (result.code === 201) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createTicketType:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật loại vé
  async updateTicketType(ticketTypeId, ticketTypeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket-types/${ticketTypeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(ticketTypeData)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateTicketType:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa loại vé
  async deleteTicketType(ticketTypeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/ticket-types/${ticketTypeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, message: 'Xóa loại vé thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteTicketType:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thống kê doanh thu theo phim
  async getRevenueByMovie(startDate, endDate) {
    try {
      const url = new URL(`${API_BASE_URL}/analytics/revenue/movie`);
      if (startDate) url.searchParams.append('startDate', startDate);
      if (endDate) url.searchParams.append('endDate', endDate);

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getRevenueByMovie:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thống kê doanh thu theo ngày
  async getRevenueByDate(startDate, endDate) {
    try {
      const url = new URL(`${API_BASE_URL}/analytics/revenue/date`);
      if (startDate) url.searchParams.append('startDate', startDate);
      if (endDate) url.searchParams.append('endDate', endDate);

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getRevenueByDate:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy tổng quan doanh thu
  async getRevenueSummary() {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/revenue/summary`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getRevenueSummary:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

// Export singleton instance
export default new TicketService();