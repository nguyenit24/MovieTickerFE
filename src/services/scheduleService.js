// Service API cho quản lý suất chiếu
const API_BASE_URL = 'http://localhost:8080/api';

class ScheduleService {
  // Lấy danh sách suất chiếu có phân trang
  async getSchedulesPaginated(page = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/suatchieu/pageable?page=${page}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getSchedulesPaginated:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy tất cả suất chiếu (không phân trang)
  async getAllSchedules() {
    try {
      const response = await fetch(`${API_BASE_URL}/suatchieu`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllSchedules:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy suất chiếu theo ID
  async getScheduleById(scheduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/suatchieu/${scheduleId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getScheduleById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Tạo suất chiếu mới
  async createSchedule(scheduleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/suatchieu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
      });
      
      const result = await response.json();
      
      if (result.code === 201) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createSchedule:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật suất chiếu
  async updateSchedule(scheduleId, scheduleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/suatchieu/${scheduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateSchedule:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa suất chiếu
  async deleteSchedule(scheduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/suatchieu/${scheduleId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, message: 'Xóa lịch chiếu thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteSchedule:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy danh sách phim cho form tạo suất chiếu
  async getMoviesForSchedule() {
    try {
      const response = await fetch(`${API_BASE_URL}/phim`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getMoviesForSchedule:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

export default new ScheduleService();
