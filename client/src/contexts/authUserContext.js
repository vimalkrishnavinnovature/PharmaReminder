//create an auth user context using react implemented with server side protection from django
import React,{useState,createContext,useContext,useEffect} from "react";
import axios from 'axios';
const AuthUserContext = createContext(null);

export const AuthUserProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user,setUser] = useState(null);
    useEffect(() => {
        const checkLoginStatus = async () => {
          try {
            const response = await axios.get('/check_login/');
            if (response.data.isAuthenticated) {
              setIsAuthenticated(true);
              setUser(response.data.user);
            } else {
              setIsAuthenticated(false);
              setUser(null);
            }
          } catch (error) {
            console.error('Error checking login status:', error);
            setIsAuthenticated(false);
            setUser(null);
          }
        };
    
        checkLoginStatus();
      }, []);

    return (
        <AuthUserContext.Provider value={{ isAuthenticated,setIsAuthenticated,user,setUser}} >
            {children}
        </AuthUserContext.Provider>
    )
}

export const useAuth= () => {
    return useContext(AuthUserContext);
}