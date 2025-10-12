// Service API cho quản lý phòng chiếu
const API_BASE_URL = 'http://localhost:8080/api';
const token = localStorage.getItem("accessToken");
class RoomService {

  async getRoomsPaginated(page = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/phongchieu/pageable?page=${page}`, {
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
      console.error('Lỗi kết nối API getRoomsPaginated:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  async getAllRooms() {
    try {
      const response = await fetch(`${API_BASE_URL}/phongchieu`, {
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
      console.error('Lỗi kết nối API getAllRooms:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  async getRoomById(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/phongchieu/${roomId}`, {
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
      console.error('Lỗi kết nối API getRoomById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  async createRoom(roomData) {
    try {
      const response = await fetch(`${API_BASE_URL}/phongchieu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  async updateRoom(roomId, roomData) {
    try {
      const response = await fetch(`${API_BASE_URL}/phongchieu/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  async deleteRoom(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/phongchieu/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
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

  async getRoomSeats(roomId) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/seats`, {
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
      console.error('Lỗi kết nối API getRoomSeats:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

}

// Export singleton instance
export default new RoomService();