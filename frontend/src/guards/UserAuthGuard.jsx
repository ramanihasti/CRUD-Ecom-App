import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UserAuthGuard({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchUser() {
    try {
    } catch (error) {}
  }

  return <div>{children}</div>;
}

export default UserAuthGuard;
