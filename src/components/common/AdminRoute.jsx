import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();
  
  console.log('AdminRoute - Checking user:', user);

  if (!user) {
    // Nếu chưa đăng nhập, chuyển về trang login
    console.log('AdminRoute - User not logged in, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (!user.roles.includes("ROLE_ADMIN")) {
    // Nếu đăng nhập nhưng không phải admin, chuyển về trang chủ (hoặc trang lỗi 403)
    console.log('AdminRoute - User not admin, redirecting to home');
    return <Navigate to="/" />;
  }

  // Nếu là admin, cho phép truy cập
  console.log('AdminRoute - User is admin, granting access');
  return <Outlet />;
};

export default AdminRoute;
