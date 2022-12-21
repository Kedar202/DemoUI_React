import React from "react";
import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const Token = localStorage.getItem("accessToken");
  if (Token) {
    const user = { loggedIn: true };
    return user && user.loggedIn;
  } else {
    const user = { loggedIn: false };
    return user && user.loggedIn;
  }
};

const Protect = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default Protect;
