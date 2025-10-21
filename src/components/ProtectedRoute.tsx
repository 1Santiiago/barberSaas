import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // ainda carregando o cookie
    return <div className="p-6 text-center">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
