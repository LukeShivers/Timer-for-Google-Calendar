import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    // Switch authentication on and off
    const isAuthenticated = true;

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace state={{ from: location }} />
    );
}

export default RequireAuth