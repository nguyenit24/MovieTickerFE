// Service API cho quản lý thể loại phim
const API_BASE_URL = 'http://localhost:8080/api';

class PromotionService {

    async getAllPromotion(page = 1) {
        try {
            const response = await fetch(`${API_BASE_URL}/khuyenmai`);
            const result = await response.json();
            if (result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API getAllPromotion:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    // Thêm thể loại mới
    async createPromotion(promotionData) {
        try {
            const response = await fetch(`${API_BASE_URL}/khuyenmai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promotionData)
            });
            const result = await response.json();
            if (result.code === 201 || result.code === 200) {
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API createCategory:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }

    // Cập nhật thể loại
    async updateCategory(categoryId, categoryData) {
        try {
            const response = await fetch(`${API_BASE_URL}/theloai/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData)
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
    async deleteCategory(categoryId) {
        try {
            const response = await fetch(`${API_BASE_URL}/theloai/${categoryId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.code === 200) {
                return { success: true, message: 'Xóa thể loại thành công' };
            } else {
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.error('Lỗi kết nối API deleteCategory:', error);
            return { success: false, message: 'Lỗi kết nối server' };
        }
    }
}

export default new PromotionService();