import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user) {
    // Nếu chưa đăng nhập, chuyển về trang login
    return <Navigate to="/login" />;
  }

  if (!user.roles.includes("ROLE_ADMIN")) {
    // Nếu đăng nhập nhưng không phải admin, chuyển về trang chủ (hoặc trang lỗi 403)
    return <Navigate to="/" />;
  }

  // Nếu là admin, cho phép truy cập
  return <Outlet />;
};

export default AdminRoute;
