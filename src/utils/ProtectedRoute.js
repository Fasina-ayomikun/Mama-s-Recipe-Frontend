import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children, id }) {
  if (!id) {
    toast.warning("Please Log In");
    return <Navigate to='/'></Navigate>;
  } else {
    return children;
  }
}

export default ProtectedRoute;
