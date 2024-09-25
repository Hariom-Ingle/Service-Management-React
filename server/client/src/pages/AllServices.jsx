import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllServices() {
  const { services, likedServices = [], likeService } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filteredServices, setFilteredServices] = useState([]);
  const [city, setCity] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [serviceSuggestions, setServiceSuggestions] = useState([]);
  const cityInputRef = useRef(null);
  const serviceInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFilteredServices(services);
    }, 2000);

    return () => clearTimeout(timer);
  }, [services]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    filterServices(e.target.value, serviceName);
    suggestCities(e.target.value);
  };

  const handleServiceChange = (e) => {
    setServiceName(e.target.value);
    filterServices(city, e.target.value);
    suggestServices(e.target.value);
  };

  const filterServices = (city, serviceName) => {
    const filtered = services.filter((service) => {
      const matchesCity =
        service.address.toLowerCase().includes(city.toLowerCase()) ||
        service.cityName.toLowerCase().includes(city.toLowerCase());
      const matchesService = service.businessName
        .toLowerCase()
        .includes(serviceName.toLowerCase());
      return matchesCity && matchesService;
    });
    setFilteredServices(filtered);
  };

  const suggestCities = (input) => {
    const suggestions = [
      ...new Set(
        services.flatMap((service) => [service.address, service.cityName])
      ),
    ];
    setCitySuggestions(
      suggestions.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const suggestServices = (input) => {
    const suggestions = [
      ...new Set(services.map((service) => service.businessName)),
    ];
    setServiceSuggestions(
      suggestions.filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setCitySuggestions([]);
      setServiceSuggestions([]);
    }
  };

  const handleClickOutside = (event) => {
    if (cityInputRef.current && !cityInputRef.current.contains(event.target)) {
      setCitySuggestions([]);
    }
    if (
      serviceInputRef.current &&
      !serviceInputRef.current.contains(event.target)
    ) {
      setServiceSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLikeClick = async (serviceId) => {
    try {
      await likeService(serviceId);
      toast.success(
        likedServices.includes(serviceId)
          ? "Removed from favorites"
          : "Added to favorites",
        { autoClose: 2000 }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShareClick = (serviceId) => {
    const serviceLink = window.location.origin + `/service/${serviceId}`;
    navigator.clipboard.writeText(serviceLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div>
      <div className="chetan flex justify-start gap-4 mt-24 mb-44 p-2 border-b-2 border-gray-600 border-opacity-15 fixed top-0 left-0 right-0 z-10 ">
        <div className=" " ref={cityInputRef}>
          <input
            type="text"
            placeholder="Search by city"
            value={city}
            onChange={handleCityChange}
            onKeyPress={handleKeyPress}
            className="p-2 border rounded sm:w-72 sm:mx-3 bg-gray-100 text-black"
          />
          {citySuggestions.length > 0 && (
            <ul className="absolute bg-white border mt-1 mx-3 rounded z-50 ">
              {citySuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setCity(suggestion);
                    setCitySuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div ref={serviceInputRef}>
          <input
            type="text"
            placeholder="Search by business name"
            value={serviceName}
            onChange={handleServiceChange}
            onKeyPress={handleKeyPress}
            className="p-2 border rounded sm:w-96 sm:mx-3 bg-gray-100 text-black"
          />
          {serviceSuggestions.length > 0 && (
            <ul className="absolute bg-white border mt-1 rounded">
              {serviceSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setServiceName(suggestion);
                    setServiceSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="terminal-loader">
            <div className="text">Loading...</div>
          </div>
        </div>
      ) : (
        filteredServices.map((business, index) => (
          <div
            key={business._id}
            className={`block mb-4 ${index === 0 ? "mt-40" : "mt-4"}`}
          >
            <div className="flex flex-col xl:w-3/4 md:flex-row bg-gray-200 rounded-xl p-4 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]">
              <div className="flex-shrink-0 w-full md:w-80 flex justify-center">
              
                  <img
                    src={`./uploads/${business.images[0]}`}
                    alt="Business"
                    className="rounded-xl w-full h-64 object-cover mb-2"
                  />
               
              </div>

              <div className="flex flex-col justify-self-stretch ml-0 md:ml-6 mt-4 md:mt-0 relative w-full">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl pr-5 font-bold -z-0">
                    {business.businessName}
                  </h2>
                  <button
                    className="text-red-600 hover:scale-100 transition-all duration-300"
                    onClick={() => handleLikeClick(business._id)}
                  >
                    {likedServices.includes(business._id) ? (
                      <i className="bi bi-heart-fill"></i>
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </button>
                </div>
                {/* <StarRating rating={service.averageRating} /> Display star rating */}
                {/* <div className="flex gap-1.5 mb-4">
                  <i className="bi bi-star-fill text-yellow-500"></i>
                  <i className="bi bi-star-fill text-yellow-500"></i>
                  <i className="bi bi-star-fill text-yellow-500"></i>
                  <i className="bi bi-star-half text-yellow-500"></i>
                  <i className="bi bi-star text-yellow-500"></i>
                </div> */}
                <div className="flex gap-2 mt-4 mb-4">
                  {business.serviceName ? (
                    Array.isArray(business.serviceName) ? (
                      business.serviceName.map((name, index) => (
                        <button
                          key={index}
                          className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md"
                        >
                          {name}
                        </button>
                      ))
                    ) : (
                      <button className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md">
                        {business.serviceName}
                      </button>
                    )
                  ) : (
                    <Skeleton width={100} />
                  )}
                </div>
                <div className="flex gap-2 mb-4">
                  <i className="bi bi-geo-alt">
                    {business.address || <Skeleton width={150} />}
                  </i>
                </div>
                <div className="pt-2 flex gap-4 mt-4">
                  <Link to={`tel:${business.contact}`} className="no-underline">
                    <button
                      className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white`}
                    >
                      <i className="bi bi-telephone"></i>{" "}
                      {business.contact || <Skeleton width={100} />}
                    </button>
                  </Link>
                  <Link
                    to={`https://wa.me/?text=${business.contact}`}
                    className="no-underline"
                  >
                    <button
                      className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white`}
                    >
                      <i className="bi bi-whatsapp"></i> Chat
                    </button>
                  </Link>
                  <button
                    className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white`}
                    onClick={() => handleShareClick(business._id)}
                  >
                    <i className="bi bi-share"></i> Share
                  </button>
                  <Link to={`/Service/${business._id}`}>
                    <button className="rounded-lg border-2 border-black border-opacity-5 py-1.5 px-2.5 text-black">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {likedServices[business._id] && (
              <p className="text-green-500">{likedServices[business._id]}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AllServices;
