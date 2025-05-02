import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token === "saluber_admin_token" ? children : <Navigate to="/login" replace />;
}
