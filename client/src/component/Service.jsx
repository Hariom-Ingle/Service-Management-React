import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

function Services() {
  const { services, likedServices = [], likeService } = useAuth(); // Default to empty array
  const [callClicked, setCallClicked] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);
  const [likeMessages, setLikeMessages] = useState({});
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const handleCallClick = () => {
    setCallClicked(true);
    setTimeout(() => {
      setCallClicked(false);
    }, 200);
  };

  const handleChatClick = () => {
    setChatClicked(true);
    setTimeout(() => {
      setChatClicked(false);
    }, 200);
  };

  const handleLikeClick = async (serviceId) => {
    try {
      const updatedLikedServices = await likeService(serviceId);
      const message = likedServices.includes(serviceId) ? "Removed from favorites" : "Added to favorites";
      setLikeMessages((prevMessages) => ({
        ...prevMessages,
        [serviceId]: message,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Simulate loading delay for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div>
      {loading ? ( // Display loader when loading is true
       <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2  border-bg-gradient-to-r from-orange-500 to-amber-400"></div><br />
       
        </div>
      ) : (
        services.map((business) => (
          <div key={business._id} className="block mb-4 mt-5">
            <div className="flex flex-col xl:w-3/4 md:flex-row bg-gray-200 rounded-xl p-4 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]">
              <div className="flex-shrink-0 w-full md:w-80 flex justify-center">
                {business.images[0] ? (
                  <img
                    src={`./uploads/${business.images[0]}`}
                    alt="Business"
                    className="rounded-xl w-full h-64 object-cover mb-2"
                  />
                ) : (
                  <Skeleton height={256} />
                )}
              </div>
              <div className="flex flex-col justify-self-stretch ml-0 md:ml-6 mt-4 md:mt-0 relative w-full">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl pr-5 font-bold">{business.businessName || <Skeleton width={200} />}</h2>
                  {likedServices.includes(business._id) ? (
                    <button className="text-red-600 hover:scale-100 transition-all duration-300" onClick={() => handleLikeClick(business._id)}>
                      <i className="bi bi-heart-fill"></i>
                    </button>
                  ) : (
                    <button onClick={() => handleLikeClick(business._id)}>
                      <i className="bi bi-heart"></i>
                    </button>
                  )}
                </div>
                <div className="flex gap-1.5 mb-4">
                  <i className="bi bi-star-fill text-yellow-500"></i>
                  <i className="bi bi-star-fill text-yellow-500"></i>
                  <i className="bi bi-star-fill text-yellow-500"></i>
                  <i className="bi bi-star-half text-yellow-500"></i>
                  <i className="bi bi-star text-yellow-500"></i>
                </div>
                <div className="flex gap-2 mb-4">
                {(business.serviceName).map((name, index) => (
                  <button
                    key={index}
                    className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md"
                  >
                    {name}
                  </button>
                ))}
              </div>
                <div className="flex gap-2 mb-4">
                  <i className="bi bi-geo-alt">{business.address || <Skeleton width={150} />}</i>
                </div>
                <div className="pt-2 flex gap-4 mt-4">
                  <a href={`tel:${business.contact}`} className="no-underline">
                    <button
                      className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white ${callClicked ? "scale-105" : ""}`}
                      onClick={handleCallClick}
                    >
                      <i className="bi bi-telephone"></i> {business.contact || <Skeleton width={100} />}
                    </button>
                  </a>
                  <a href="https://wa.link/ldhknj" className="no-underline">
                    <button
                      className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white ${chatClicked ? "scale-105" : ""}`}
                      onClick={handleChatClick}
                    >
                      <i className="bi bi-whatsapp"></i> Chat
                    </button>
                  </a>
                  <Link to={`/Service/${business._id}`}>
                    <button className="rounded-lg border-2 border-black border-opacity-5 py-1.5 px-2.5 text-black">
                      Details
                    </button>
                  </Link>
                </div>
                {likeMessages[business._id] && (
                  <p className="text-green-500">{likeMessages[business._id]}</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Services;
