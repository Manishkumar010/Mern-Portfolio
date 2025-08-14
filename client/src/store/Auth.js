import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const AuthorizationToken = `Bearer ${token}`;
    const API = "https://mern-portfolio-hrh2.onrender.com";

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching user data");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, []);

    // Yaha return ko clean format me rakho
    return (
        <AuthContext.Provider
            value={{
                storeTokenInLS,
                LogoutUser,
                isLoggedIn,
                user,
                AuthorizationToken,
                API,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
