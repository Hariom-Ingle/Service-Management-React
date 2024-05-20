import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

function Services() {
  const { services } = useAuth();

  const [callClicked, setCallClicked] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);

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

  return (
    <div className="">
      {services.map((business) => (
        <Link key={business._id} className="block mb-4 ">
          <div className="flex flex-col xl:w-3/4 md:flex-row bg-gray-200 rounded-xl p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <Link to={`/Service/${business._id}`} className="flex-shrink-0 w-full md:w-80 flex justify-center">
              {business.images[0] && (
                <img
                  src={`./uploads/${business.images[0]}`}
                  alt="Business"
                  className="rounded-xl w-full h-64 object-cover mb-2"
                />
              )}
            </Link>
            <div className="flex flex-col justify-self-stretch ml-0 md:ml-6 mt-4 md:mt-0 relative w-full">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl pr-5 font-bold">{business.businessName}</h2>
                <div className="absolute top-0 right-0  md:static md:ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    width="18"
                    viewBox="0 0 512 512"
                  >
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-1.5 text-yellow-500 mb-4">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <i className="bi bi-star"></i>
              </div>
              <div className="mb-3">
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
                  <button>
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Services;
