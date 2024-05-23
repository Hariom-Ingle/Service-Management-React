import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  const { services, deleteService, user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const galleryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const serviceData = services.find((s) => s._id === id);
    if (serviceData) {
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

  const handleEditClick = () => {
    navigate(`/business/${service._id}`, { state: { service } });
  };
  const myid="664e3f8cac856d8364458a6e"
  const handleDeleteClick = async () => {
    try {
      await deleteService(service._id); // Pass service._id to deleteService
      // Optionally add further logic here, such as showing a success message or refreshing data
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  
  

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

  return (
    <>
      <div className="container mx-auto md:w-4/5 mt-2 w-11/12 bg-gray-50 shadow-[0_10px_5px_rgba(8,_112,_184,_0.7)] py-10">
        <div className="grid grid-cols-1 mx-2 md:grid-cols-1 gap-8">
          <div className="grid grid-cols-2  gap-1 md:px-40">
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative col-span-1">
                <img
                  src={image || images[0]}
                  alt="Service"
                  onClick={openGallery}
                  className="cursor-pointer w-full h-full object-cover"
                />
                {index === 3 && (
                  <>
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold"
                      onClick={openGallery}
                    >
                      More
                    </div>
                    <div className="absolute bottom-0 right-0 bg-black text-white p-2">
                      {images.length} images
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="md:mx-20 mx-2 md:grid md:grid-cols-2 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)] rounded-xl">
            <div className="md:col-span-1 p-4">
              <div className="">
                <h1 className="text-2xl font-bold mb-2">
                  {service.businessName}
                </h1>
              </div>

              <div className="pt-2 md:flex gap-4 mb-2">
                <p className="mb-2">
                  <i className="bi bi-geo-alt"></i>
                  {service.address}, {service.cityName}, {service.stateName}
                </p>
              </div>
              <div className="flex gap-2 mb-4">
                {JSON.parse(service.serviceName).map((name, index) => (
                  <button
                    key={index}
                    className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <div className="flex mb-2 gap-5">
                <button className="py-1.5 px-2.5 rounded-lg bg-green-700">
                  <Link to={`tel:${service.contact}`}>
                    <i className="bi bi-telephone not-italic">
                      {" "}
                      {service.contact}
                    </i>
                  </Link>
                </button>
                <button className="py-1.5 px-2.5 rounded-lg bg-green-700">
                  <Link to={`https://wa.link/${service.whatsapp}`}>
                    <i className="bi bi-whatsapp not-italic"> Chat</i>
                  </Link>
                </button>
              </div>
            </div>
            <div className="flex md:justify-end md:items-start p-4">
              {user.email === service.email ? (
                <div>
                  <button
                    className="py-1.5 px-3 border-0 rounded-lg shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]"
                    onClick={handleEditClick}
                  >
                    <i className="mx-2 bi bi-pencil-square"></i>Edit
                  </button>
                  <button
                    className="py-1.5 px-3 mx-2 border-0 rounded-lg shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]"
                    onClick={handleDeleteClick}
                  >
                    <i className="bi bi-trash"></i>Delete
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="my-8 mx-2 md:mx-20 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)] border-primary rounded-xl p-5">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <div dangerouslySetInnerHTML={{ __html: service.description }} />
          </div>
        </div>
      </div>

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
