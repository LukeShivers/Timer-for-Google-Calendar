import { createContext, useState, useContext } from "react";

const AuthContext = createContext(false);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(RequireAuth);
    return context;
};