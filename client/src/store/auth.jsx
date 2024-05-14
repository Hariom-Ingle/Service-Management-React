import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token,setToken]=useState(localStorage.getItem("token"))

  // Token saving to the local Storage
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  //  logout functionality

  let isLoggedIn =!!token;  //if token present then isLoggedIn is true otherwise false 

  console.log("Is Loggin",isLoggedIn)
  const LogoutUser =()=>{

    setToken("")
    return localStorage.removeItem("token")
    
  }




  return (
    <AuthContext.Provider value={{ storeTokenInLS,LogoutUser,isLoggedIn }}>
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
