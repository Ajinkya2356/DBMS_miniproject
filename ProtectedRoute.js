import React from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Return a loader or placeholder during loading
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null; // Prevent rendering of the Route if not authenticated
  }

  if (isAdmin && user.role !== "admin") {
    navigate("/login");
    return null; // Prevent rendering of the Route if not an admin
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
