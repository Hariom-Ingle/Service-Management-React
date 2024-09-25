import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../store/auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function Favorites() {
  const { services, likedServices = [], likeService } = useAuth(); // Default to empty array
  const [callClicked, setCallClicked] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);
  const [likeMessages, setLikeMessages] = useState({});
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const cityInputRef = useRef(null);
  const serviceInputRef = useRef(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleCallClick = () => {
    setCallClicked(true);
    setTimeout(() => setCallClicked(false), 200);
  };

  const handleChatClick = () => {
    setChatClicked(true);
    setTimeout(() => setChatClicked(false), 200);
  };

  const handleLikeClick = async (serviceId) => {
    try {
      const updatedLikedServices = await likeService(serviceId);
      const message = likedServices.includes(serviceId)
        ? "Removed from favorites"
        : "Added to favorites";
      setLikeMessages((prevMessages) => ({
        ...prevMessages,
        [serviceId]: message,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const likedServicesList = services.filter((service) =>
    likedServices.includes(service._id)
  );

  return (
    <section style={{ height: "100vh" }}>
      <div className="mt-24" style={{ height: "100vh" }}>
        <div className="grid grid-cols-1 mt-6">
          {likedServicesList.length > 0 ? (
            likedServicesList.map((service) => (
              <div key={service._id} className="p-4 lg:mx-10">
                <div className="flex flex-col xl:w-3/4 md:flex-row bg-gray-200 rounded-xl p-4 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]">
                  <div className="flex-shrink-0 w-full md:w-80 flex justify-center">
                    {service.images[0] ? (
                      <img
                        src={`./uploads/${service.images[0]}`}
                        alt="Business"
                        className="rounded-xl w-full h-64 object-cover mb-2"
                      />
                    ) : (
                      <Skeleton height={256} />
                    )}
                  </div>

                  <div className="flex flex-col justify-self-stretch ml-0 md:ml-6 mt-4 md:mt-0 relative w-full">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-xl pr-5 font-bold -z-0">
                        {service.businessName || <Skeleton width={200} />}
                      </h2>
                      <button
                        className={`text-red-600 hover:scale-100 transition-all duration-300 ${
                          likedServices.includes(service._id) ? "bi bi-heart-fill" : "bi bi-heart"
                        }`}
                        onClick={() => handleLikeClick(service._id)}
                      ></button>
                    </div>

                    <div className="flex gap-1.5 mb-4">
                      {[...Array(3)].map((_, index) => (
                        <i key={index} className="bi bi-star-fill text-yellow-500"></i>
                      ))}
                      <i className="bi bi-star-half text-yellow-500"></i>
                      <i className="bi bi-star text-yellow-500"></i>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {service.serviceName ? (
                        Array.isArray(service.serviceName) ? (
                          service.serviceName.map((name, index) => (
                            <button
                              key={index}
                              className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md"
                            >
                              {name}
                            </button>
                          ))
                        ) : (
                          <button className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md">
                            {service.serviceName}
                          </button>
                        )
                      ) : (
                        <Skeleton width={100} />
                      )}
                    </div>

                    <div className="flex gap-2 mb-4">
                      <i className="bi bi-geo-alt">
                        {service.address || <Skeleton width={150} />}
                      </i>
                    </div>

                    <div className="pt-2 flex gap-4 mt-4">
                      <Link to={`tel:${service.contact}`} className="no-underline">
                        <button
                          className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white ${
                            callClicked ? "scale-105" : ""
                          }`}
                          onClick={handleCallClick}
                        >
                          <i className="bi bi-telephone"></i> {service.contact || <Skeleton width={100} />}
                        </button>
                      </Link>
                      <Link to="https://wa.link/ldhknj" className="no-underline">
                        <button
                          className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white ${
                            chatClicked ? "scale-105" : ""
                          }`}
                          onClick={handleChatClick}
                        >
                          <i className="bi bi-whatsapp"></i> Chat
                        </button>
                      </Link>
                      <Link to={`/Service/${service._id}`}>
                        <button className="rounded-lg border-2 border-black border-opacity-5 py-1.5 px-2.5 text-black">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col align-items-center justify-center">
              <img
                src="images/shopping.png"
                alt="No liked services yet."
                className="m-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Favorites;
