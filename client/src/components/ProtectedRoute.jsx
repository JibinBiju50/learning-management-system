import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

export function ProtectedRoute({role, children}){
    const { user } = useAuth();

    if(!user) return <Navigate to="/login" />
    if(role && user.role !== role) return <Navigate to="/" />
    return children;
}