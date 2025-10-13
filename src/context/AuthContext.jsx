import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        const roles = decodedUser.scope ? decodedUser.scope.split(" ") : [];
        setUser({ username: decodedUser.sub, roles });
      } catch (error) {
        console.error("Token không hợp lệ, đang đăng xuất:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }
  }, []);

  const loginAction = (data) => {
    const { accessToken, refreshToken } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const decodedUser = jwtDecode(accessToken);
    const roles = decodedUser.scope ? decodedUser.scope.split(" ") : [];
    setUser({ username: decodedUser.sub, roles });
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const value = { user, loginAction, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
