import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RequireCustomer() {
  const { isCustomer } = useAuth();
  const loc = useLocation();
  return isCustomer ? <Outlet /> : <Navigate to="/login" state={{ from: loc.pathname + loc.search }} replace />;
}
export function RequireStaff() {
  const { isStaff } = useAuth();
  return isStaff ? <Outlet /> : <Navigate to="/login" state={{ staff: true }} replace />;
}
export function RequireSuperadmin() {
  const { isSuperadmin } = useAuth();
  return isSuperadmin ? <Outlet /> : <Navigate to="/admin" replace />;
}
