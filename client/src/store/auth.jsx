import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  // * saving to the local Storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // * logout functionality**
  let isLoggedIn = !!token; // if token present then isLoggedIn is true otherwise false
  console.log("Is Logged In:", isLoggedIn);
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // * JWT authentication - to get the currently logged-in Data
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
      fetchAllServices();
    }
  }, [token]);

  /////*  services fetching  *////
  const fetchAllServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/business/all", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched services:", data);
        setServices(data);
      } else {
        console.error("Error fetching services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, services }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContextValue;
};
