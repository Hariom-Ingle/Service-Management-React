import React, { useContext, useEffect, useState, useRef } from "react";

import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../store/auth";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "bootstrap-icons/font/bootstrap-icons.css";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

import "./Gallery.css";

function ServiceDetails() {
  const { id } = useParams();
  const { services } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const galleryRef = useRef(null);
  const [callClicked, setCallClicked] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);

  useEffect(() => {
    // Find the service with the specified ID
    const serviceData = services.find((s) => s._id === id);
    if (serviceData) {
      // If service with ID is found, set the service state
      setService(serviceData);
    } else {
      console.error("Service not found");
    }
  }, [id, services]);

  useEffect(() => {
    if (galleryRef.current && service) {
      const galleryInstance = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        licenseKey: "your_license_key", // Replace with your LightGallery license key if you have one
        speed: 500,
      });

      if (galleryInstance && galleryInstance.core) {
        // Override the addEventListener method to make the events passive
        const originalAddEventListener =
          galleryInstance.core.el.addEventListener;
        galleryInstance.core.el.addEventListener = function (
          type,
          listener,
          options = {}
        ) {
          if (type === "touchmove" || type === "touchstart") {
            options = { passive: true, ...options };
          }
          originalAddEventListener.call(this, type, listener, options);
        };
      }
    }
  }, [service]);

  if (!service) {
    return <div>Loading...</div>;
  }

  const images = service.images
    ? service.images.map((image) => `/uploads/${image}`)
    : [];

  const openGallery = () => {
    if (galleryRef.current) {
      const firstImageLink = galleryRef.current.querySelector("a");
      if (firstImageLink) {
        firstImageLink.click();
      }
    }
  };
  const renderDescription = () => {
    // Replace line breaks with <br> tags
    const formattedDescription = service.description.replace(/\n/g, "<br>");

    // Use dangerouslySetInnerHTML to render HTML content
    return { __html: formattedDescription };
  };

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
    <>
      <div className="container mx-auto md:w-4/5 mt-2 w-11/12   bg-gray-50 shadow-[0_10px_5px_rgba(8,_112,_184,_0.7)]  py-10">
        <div className="grid grid-cols-1 mx-2  md:grid-cols-1 gap-8 ">
          <div className="grid grid-cols-2 gap-1 md:px-40  ">
            
            {/* Image container 1 */}
            <div className="relative    ">
              <img
                src={images[0]}
                alt="Service"
                onClick={openGallery}
                className="cursor-pointer w-full h-full object-cover"
              />
            </div>
            {/* Image container 2 */}
            <div className="relative  ">
              <img
                src={images[1]}
                alt="Service"
                onClick={openGallery}
                className="cursor-pointer w-full h-full object-cover"
              />
            </div>
            {/* Image container 3 */}
            <div className="relative  ">
              <img
                src={images[2]}
                alt="Service"
                onClick={openGallery}
                className="cursor-pointer w-full h-full object-cover"
              />
            </div>
            {/* Image container 4 */}
            <div className="relative  ">
              <img
                src={images[0]}
                alt="Service"
                onClick={openGallery}
                className="cursor-pointer w-full h-full object-cover"
              />
              {/* Overlay for 'More' text */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold"
                onClick={openGallery}
              >
                More
              </div>
              {/* Number of images text */}
              <div className="absolute bottom-0 right-0 bg-black text-white p-2">
                {images.length} images
              </div>
            </div>
          </div>

          <div className=" md:mx-20 mx-2 md:grid md:grid-cols-2  shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]  rounded-xl">
            <div className="md:col-span-1 p-4">
              <div className="">
                <h1 className="text-2xl font-bold mb-2">
                  {service.businessName}
                </h1>
              </div>
              <div className="flex gap-1.5 mb-4 ">
                <i className="bi bi-star-fill  text-yellow-500 "></i>
                <i className="bi bi-star-fill text-yellow-500 "></i>
                <i className="bi bi-star-fill text-yellow-500 "></i>
                <i className="bi bi-star-half text-yellow-500 "></i>
                <i className="bi bi-star text-yellow-500 "></i>
              </div>

              <div className="flex gap-5 mb-2">
                <button className=" rounded-md border-solid    shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]    py-1 px-2 text-xs ">
                  Catering
                </button>
                <button className=" rounded-md border-solid    shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]    py-1 px-2 text-xs   ">
                  Lawns
                </button>
              </div>

              <div className="pt-2 md:flex  gap-4 mb-2">
                <p className="mb-2">
                  <i className="bi bi-geo-alt"></i>
                  {service.address}, {service.cityName},{service.stateName}
                </p>
                {/* <p className="mb-2">Price: {service.price}</p> */}
              </div>

              <div className="flex mb-2 gap-5">
                <Link to="tel:789456123">
                  <button
                    className={`rounded-lg py-1.5 px-2.5 bg-green-700 ${
                      callClicked ? "scale-105" : ""
                    }`}
                    onClick={handleCallClick}
                  >
                    <i className="bi bi-telephone not-italic"> 789456123 </i>
                  </button>
                </Link>

                <Link to="https://wa.link/ldhknj">
                  <button
                    className={`rounded-lg py-1.5 px-2.5 bg-green-700 ${
                      chatClicked ? "scale-105" : ""
                    }`}
                    onClick={handleChatClick}
                  >
                    <i className="bi bi-whatsapp not-italic"> Chat</i>
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex md:justify-end md:items-start  p-4">
              <Link className=" ">

              <button className="py-1.5 px-3 border-0 rounded-lg shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]"    ><i className=" mx-2 bi bi-pencil-square"></i>Edit</button>
              </Link>
            </div>
          </div>

          <div className="my-8 mx-2 md:mx-20 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)] border-primary rounded-xl p-5">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <div dangerouslySetInnerHTML={renderDescription()} />
          </div>
        </div>
      </div>

      {/* Hidden gallery for lightgallery */}
      <div ref={galleryRef} style={{ display: "none" }}>
        {images.map((src, index) => (
          <a key={index} href={src}>
            <img src={src} alt={`Gallery Image ${index + 1}`} />
          </a>
        ))}
      </div>
    </>
  );
}

export default ServiceDetails;
