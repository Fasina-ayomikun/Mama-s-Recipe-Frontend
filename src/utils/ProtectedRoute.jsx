import React from "react";
import { Navigate } from "react-router-dom";
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
