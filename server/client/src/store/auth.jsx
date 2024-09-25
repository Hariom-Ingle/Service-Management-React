import React, { createContext, useContext, useEffect, useState } from "react";
 


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [likedServices, setLikedServices] = useState([]); // Initialize as empty array
  const [likeMessages, setLikeMessages] = useState({}); // Initialize as an empty object

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
      const response = await fetch(`${ window.location.origin}/api/auth/user`, {
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
      const response = await fetch(`${window.location.origin}/api/business/all`, {
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
      const response = await fetch(`${window.location.origin}/api/like/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId }),
      });

      if (response.ok) {
        const updatedService = services.map((service) =>
          service._id === serviceId
            ? { ...service, likes: service.likes + 1 }
            : service
        );
        setServices(updatedService);

        if (!likedServices.includes(serviceId)) {
          setLikedServices((prevLikedServices) => [
            ...prevLikedServices,
            serviceId,
          ]);
          setLikeMessages((prevMessages) => ({
            ...prevMessages,
            [serviceId]: "Added to favorites",
          }));
        } else {
          const updatedLikedServices = likedServices.filter(
            (id) => id !== serviceId
          );
          setLikedServices(updatedLikedServices);
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

  //**** Deleting service ****//
  const deleteService = async (serviceId) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/business/delete/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token if required
          },
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to delete service";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          // Handle case where response is not JSON
        }
        throw new Error(errorMessage);
      }

      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

// review   system
const addReview = async (id, review) => {
  try {
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    await fetch(`${window.location.origin}/api/business/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(review)
    });
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

const fetchServiceReviews = async (id) => {
  try {
    const response = await fetch(`${window.location.origin}/api/business/all`);
    const data = await response.json();
    const service = data.find((s) => s._id === id);
    return service.reviews;
  } catch (error) {
    console.error("Error fetching service reviews:", error);
    return [];
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
        deleteService,
        likeMessages,
        addReview, fetchServiceReviews,
         
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
