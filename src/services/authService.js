const API_URL = "http://localhost:8080/api/auth";

const handleResponse = async (response) => {
  const result = await response.json();
  if (!response.ok) {
    return {
      success: false,
      message: result.message || `Lỗi ${response.status}`,
    };
  }
  return { success: true, data: result.data, message: result.message };
};

const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến máy chủ." };
  }
};

const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến máy chủ." };
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến máy chủ." };
  }
};
const resetPassword = async (data) => {
  try {
    const payload = {
      otp: data.token,
      newPassword: data.newPassword,
    };
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  } catch (error) {
    return { success: false, message: "Không thể kết nối đến máy chủ." };
  }
};

const authService = {
  login,
  register,
  forgotPassword,
  resetPassword,
};

export default authService;
