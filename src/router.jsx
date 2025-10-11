import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Admin from "./page/Admin";
import Register from "./page/Register";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword"; // Đảm bảo bạn đã import trang này

// Import các "Người Gác Cổng"
import AdminRoute from "./components/common/AdminRoute";
import PublicRoute from "./components/common/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  // -- CÁC TRANG CÔNG KHAI ĐƯỢC BẢO VỆ --
  // Chỉ người chưa đăng nhập mới vào được
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Các trang không cần bảo vệ đặc biệt
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  // -- BẢO VỆ TRANG ADMIN --
  // Chỉ Admin đã đăng nhập mới vào được
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      // Thêm các trang admin khác vào đây nếu có
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
