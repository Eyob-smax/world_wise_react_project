import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../customhooks/useAuth";
import { useEffect } from "react";

export default function Authrize() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate("/login");
    }
  }, [user, isAuthenticated, navigate]);
  return isAuthenticated ? <Outlet /> : null;
}
