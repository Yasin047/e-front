import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
const UserProtectedRoute = () => {
  const navigate = useNavigate();
  const token =
    Cookies.get("token") !== undefined
      ? "Bearer " + JSON.parse(Cookies.get("token")).token
      : null;
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        Cookies.remove("token");
        navigate("/");
      }
    }
  }, [navigate, token]);

  const isExist = token ? jwt_decode(token) : null;

  if (isExist?.role === "user") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtectedRoute;
