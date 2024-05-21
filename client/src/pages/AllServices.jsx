import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

function AllServices() {
  const { services, likedServices = [], likeService } = useAuth(); // Default to empty array
  const [callClicked, setCallClicked] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);
  const [likeMessages, setLikeMessages] = useState({});
  

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
      setLikedServices(updatedLikedServices); // Update the liked services state
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
    // Clear the like message after 3 seconds
    const timeout = setTimeout(() => {
      setLikeMessages({});
    }, 3000);
    return () => clearTimeout(timeout);
  }, [likeMessages]);

  return (
    <div className="">
      {services.map((business) => (
        <div key={business._id} className="block mb-4 mt-5">
          <div className="flex flex-col xl:w-3/4 md:flex-row bg-gray-200 rounded-xl p-4 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]">
            <div className="flex-shrink-0 w-full md:w-80 flex justify-center">
              {business.images[0] && (
                <img
                  src={`./uploads/${business.images[0]}`}
                  alt="Business"
                  className="rounded-xl w-full h-64 object-cover mb-2"
                />
              )}
            </div>
            <div className="flex flex-col justify-self-stretch ml-0 md:ml-6 mt-4 md:mt-0 relative w-full">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl pr-5 font-bold">{business.businessName}</h2>
               { likedServices.includes(business._id) ?(

                <button className=" text-red-600 hover:scale-100 transition-all duration-300" onClick={() => handleLikeClick(business._id)}>
                  <i className="bi bi-heart-fill"></i>

                </button>
               ):(
                <button className="" onClick={() => handleLikeClick(business._id)}>
                <i className="bi bi-heart"></i>
              </button>
               )}

               
              </div>
              <div className="flex gap-1.5 mb-4 ">
                <i className="bi bi-star-fill  text-yellow-500 "></i>
                <i className="bi bi-star-fill text-yellow-500 "></i>
                <i className="bi bi-star-fill text-yellow-500 "></i>
                <i className="bi bi-star-half text-yellow-500 "></i>
                <i className="bi bi-star text-yellow-500 "></i>
              </div>
              <div className="flex gap-2 mb-4">
                <i className="bi bi-geo-alt">{business.address}</i>
              </div>
              <div className="flex gap-2 mb-4">
                <button className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md">
                  {business.serviceName}
                </button>
                <button className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md">
                  Lawns
                </button>
              </div>
              <div className="pt-2 flex gap-4 mt-4">
                <a href={`tel:${business.contact}`} className="no-underline">
                  <button
                    className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white ${
                      callClicked ? "scale-105" : ""
                    }`}
                    onClick={handleCallClick}
                  >
                    <i className="bi bi-telephone"></i> {business.contact}
                  </button>
                </a>
                <a href="https://wa.link/ldhknj" className="no-underline">
                  <button
                    className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white ${
                      chatClicked ? "scale-105" : ""
                    }`}
                    onClick={handleChatClick}
                  >
                    <i className="bi bi-whatsapp"></i> Chat
                  </button>
                </a>
                <Link to={`/Service/${business._id}`}>
                  <button  className="rounded-lg border-2 border-black border-opacity-5  py-1.5 px-2.5  text-black">Details</button>
                </Link>
              </div>
              {likeMessages[business._id] && (
                <p className="text-green-500">{likeMessages[business._id]}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllServices;
