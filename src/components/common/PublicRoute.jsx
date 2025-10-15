import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();
  
  console.log('PublicRoute - Checking user:', user);

  // Nếu đã có thông tin user (đã đăng nhập), chuyển hướng về trang chủ
  if (user) {
    console.log('PublicRoute - User is logged in, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Nếu chưa đăng nhập, cho phép hiển thị các trang con (Login, Register)
  console.log('PublicRoute - User is not logged in, showing login/register page');
  return <Outlet />;
};

export default PublicRoute;
