import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import { useEffect } from "react";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth ? <Outlet /> : <Navigate to={"/"} replace state={{ from: location }} />
    );
}

export default RequireAuth