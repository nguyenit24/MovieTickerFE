import apiClient from "./apiClient";

const API_BASE_URL = 'http://localhost:8080/api';

const handleApiResponse = (response) => ({
  success: true,
  data: response.data.data,
  message: response.data.message,
});
const handleError = (error) => ({
  success: false,
  message: error.response?.data?.message || "Lỗi kết nối server",
});

const serviceService = {
  // Lấy danh sách dịch vụ đi kèm
  getAllServices: async () => {
    try {
      const response = await apiClient.get("/dichvudikem");
      return handleApiResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Lấy chi tiết dịch vụ
  getServiceById: async (maDichVu) => {
    try {
      const response = await apiClient.get(`/dichvudikem/${maDichVu}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
};

export default serviceService;
