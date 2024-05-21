import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [likedServices, setLikedServices] = useState([]); // Initialize as empty array

  // * saving to the local Storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // * logout functionality**
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
    setLikedServices([]); // Clear liked services on logout
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
        setUser(data.userData);
        setLikedServices(data.userData.likedServices || []); // Ensure likedServices is an array
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
        setServices(data);
      } else {
        console.error("Error fetching services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  /////*  liking a service  *////
  const likeService = async (serviceId) => {
    try {
      const response = await fetch("http://localhost:5000/api/like/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId }),
      });
  
      if (response.ok) {
        const updatedService = services.map((service) =>
          service._id === serviceId ? { ...service, likes: service.likes + 1 } : service
        );
        setServices(updatedService);
  
        // Check if the serviceId is already in likedServices
        if (!likedServices.includes(serviceId)) {
          // If not, add it to likedServices
          setLikedServices((prevLikedServices) => [...prevLikedServices, serviceId]);
          // Display a message for adding to favorites
          setLikeMessages((prevMessages) => ({
            ...prevMessages,
            [serviceId]: "Added to favorites",
          }));
        } else {
          // If serviceId is already in likedServices, remove it
          const updatedLikedServices = likedServices.filter((id) => id !== serviceId);
          setLikedServices(updatedLikedServices);
          // Display a message for removing from favorites
          setLikeMessages((prevMessages) => ({
            ...prevMessages,
            [serviceId]: "Removed from favorites",
          }));
        }
      } else {
        console.error("Error liking service");
      }
    } catch (error) {
      console.error("Error during liking service:", error);
    }
  };
  
  
  

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedIn: !!token,
        user,
        services,
        likedServices,
        likeService,
      }}
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
