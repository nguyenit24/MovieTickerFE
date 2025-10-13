const API_BASE_URL = 'http://localhost:8080/api';

class FoodService {
    async getAllService() {
        try {
            const response = await fetch(`${API_BASE_URL}/dichvudikem`);
            const result = await response.json();
            if (result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API getAllFoodService:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    async getAllPageService(page = 1) {
        try {
            const response = await fetch(`${API_BASE_URL}/dichvudikem/pageable?page=${page}`);
            const result = await response.json();
            if (result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API getAllFoodService:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    // Thêm thể loại mới
    async createService(serviceData) {
        try {
            const response = await fetch(`${API_BASE_URL}/dichvudikem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
            const result = await response.json();
            if (result.code === 201 || result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API createService:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    async updateService(serviceId, serviceData) {
        try {
            const response = await fetch(`${API_BASE_URL}/dichvudikem/${serviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceData)
            });
            const result = await response.json();
            if (result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API updateCategory:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    // Xóa thể loại
    async deleteService(serviceId) {
        try {
            const response = await fetch(`${API_BASE_URL}/dichvudikem/${serviceId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.code === 200) {
                return { success: true, message: 'Xóa dịch vụ đi kèm thành công' };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API deleteService:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    async searchService(tenDv, danhMuc, page = 1) {
        try {
            const response = await fetch(`${API_BASE_URL}/dichvudikem/search?Ten=${encodeURIComponent(tenDv)}&Danhmuc=${encodeURIComponent(danhMuc)}&page=${page}`);
            const result = await response.json();

            if (result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API searchCategories:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }
}

export default new FoodService();