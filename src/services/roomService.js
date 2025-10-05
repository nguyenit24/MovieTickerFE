// Service API cho quản lý phòng chiếu
const API_BASE_URL = 'http://localhost:8080/api';

class RoomService {
  // Lấy danh sách phòng chiếu
  async getAllRooms() {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllRooms:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thông tin phòng theo ID
  async getRoomById(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getRoomById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Tạo phòng mới
  async createRoom(roomData) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(roomData)
      });
      
      const result = await response.json();
      
      if (result.code === 201) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createRoom:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật thông tin phòng
  async updateRoom(roomId, roomData) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(roomData)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateRoom:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa phòng
  async deleteRoom(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, message: 'Xóa phòng thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteRoom:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thông tin ghế trong phòng
  async getRoomSeats(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/seats`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getRoomSeats:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thống kê phòng
  async getRoomStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/stats`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getRoomStats:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

// Export singleton instance
export default new RoomService();