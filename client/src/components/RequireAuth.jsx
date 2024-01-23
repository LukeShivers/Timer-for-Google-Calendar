import { useState, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import AuthContext from "../contexts/AuthProvider";

const RequireAuth = () => {
    // const { auth } = useAuth();
    const location = useLocation();
    const { auth, setAuth } = useContext(AuthContext);

    console.log("RequireAuth fired");
    console.log("AUTH = ", auth)

    return (
        auth ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
}
