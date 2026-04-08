import { logoutUser } from "@/api/authApi";
import { createContext, useState } from "react";


//create context object to store user state
export const AuthContext = createContext();

//provider component that makes the data available for other components
export const AuthProvider = ({children}) => {

    //stores the logged in user object 
    const [user, setUser] = useState(null);
    
    //Called after successful login/register - saves user data to state
    const login = (userData) => {
        setUser(userData);
    }
    
    //Called on logout - clears the user from state
    const logout = async () => {
        try{
            await logoutUser();
        } catch (err){
            console.log("Api call failed", err);
        }
        setUser(null);
    }
    
    //Make user, login and logout available to child components
    return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
)
}



