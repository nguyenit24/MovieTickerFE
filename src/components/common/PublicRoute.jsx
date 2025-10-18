import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();

  // Nếu đã có thông tin user (đã đăng nhập), chuyển hướng về trang chủ
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Nếu chưa đăng nhập, cho phép hiển thị các trang con (Login, Register)
  return <Outlet />;
};

export default PublicRoute;
