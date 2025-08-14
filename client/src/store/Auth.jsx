import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("")
    const [isLoding, setIsLoading] = useState(true)
    const AuthorizationToken =`Bearer ${token}`
    console.log(AuthorizationToken)

     const API = "http://localhost:5000";

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return (localStorage.setItem('token', serverToken))
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token')
    };

    // JWT Authentication - to get the currently loggedIn data

    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization:AuthorizationToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false)
            }else{
                setIsLoading(false)
            }

        } catch (error) {
            console.error("Error fetching user data")
        }
    }


    useEffect(() => {
        userAuthentication();

    }, [])

    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user,AuthorizationToken, API, isLoding }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    };

    return authContextValue;
}