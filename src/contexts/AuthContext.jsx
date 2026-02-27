import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

  
    useEffect(() => {
        const savedUser = localStorage.getItem("movie_app_user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const register = (username, password) => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = storedUsers.find(u => u.username === username);
        if(userExists) {
            return { success: false, message: "This user is taken, try another!"}
        }

        const newUser = {username, password};
        localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
        localStorage.setItem("movie_app_user", JSON.stringify(newUser));

        return {success: true};
    };

    const login = (username, password) => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = storedUsers.find(
            u => u.username === username && u.password === password
        );

        if(!foundUser){
            return { success: false, message: "Username or password incorrect"};
        }
        setUser(foundUser);
        localStorage.setItem("movie_app_user", JSON.stringify(foundUser));

        return { success: true};
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("movie_app_user");
    };

    
    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);