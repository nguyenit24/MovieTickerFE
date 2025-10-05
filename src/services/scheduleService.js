// Service API cho quản lý lịch chiếu
const API_BASE_URL = 'http://localhost:8080/api';

class ScheduleService {
  // Lấy danh sách lịch chiếu
  async getAllSchedules() {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules`);
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

  // Lấy lịch chiếu theo ID
  async getScheduleById(scheduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/${scheduleId}`);
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

  // Tạo lịch chiếu mới
  async createSchedule(scheduleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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

  // Cập nhật lịch chiếu
  async updateSchedule(scheduleId, scheduleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/${scheduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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

  // Xóa lịch chiếu
  async deleteSchedule(scheduleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/${scheduleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
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

  // Lấy lịch chiếu theo phim
  async getSchedulesByMovie(movieId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/movie/${movieId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getSchedulesByMovie:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy lịch chiếu theo phòng
  async getSchedulesByRoom(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/room/${roomId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getSchedulesByRoom:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy lịch chiếu theo ngày
  async getSchedulesByDate(date) {
    try {
      const response = await fetch(`${API_BASE_URL}/schedules/date/${date}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getSchedulesByDate:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

// Export singleton instance
export default new ScheduleService();