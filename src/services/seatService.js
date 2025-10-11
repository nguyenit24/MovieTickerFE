// Service API cho quản lý ghế và loại ghế
const API_BASE_URL = 'http://localhost:8080/api';

class SeatService {
  // Lấy danh sách loại ghế
  async getAllSeatTypes() {
    try {
      const response = await fetch(`${API_BASE_URL}/loaighe`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getAllSeatTypes:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy thông tin loại ghế theo ID
  async getSeatTypeById(seatTypeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/loaighe/${seatTypeId}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getSeatTypeById:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Tạo loại ghế mới
  async createSeatType(seatTypeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/loaighe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seatTypeData)
      });
      
      const result = await response.json();
      
      if (result.code === 201) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API createSeatType:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Cập nhật loại ghế
  async updateSeatType(seatTypeId, seatTypeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/loaighe/${seatTypeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(seatTypeData)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateSeatType:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Xóa loại ghế
  async deleteSeatType(seatTypeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/loaighe/${seatTypeId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, message: 'Xóa loại ghế thành công' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API deleteSeatType:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }

  // Lấy ghế đã đặt cho suất chiếu
  async getBookedSeats(maSuatChieu) {
    try {
      const response = await fetch(`${API_BASE_URL}/ghe/booking/${maSuatChieu}`);
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data || [] };
      } else {
        return { success: false, data: [], message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API getBookedSeats:', error);
      return { success: false, data: [], message: 'Lỗi kết nối server' };
    }
  }



  // Cập nhật ghế
  async updateSeat(seatId, seatData) {
    try {
      // Add default room ID since all rooms have the same layout
      const dataWithDefaultRoom = {
        ...seatData,
        maPhongChieu: 1  // Using 1 as default room ID
      };
      
      const response = await fetch(`${API_BASE_URL}/ghe/${seatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataWithDefaultRoom)
      });
      
      const result = await response.json();
      
      if (result.code === 200) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Lỗi kết nối API updateSeat:', error);
      return { success: false, message: 'Lỗi kết nối server' };
    }
  }
}

export default new SeatService();