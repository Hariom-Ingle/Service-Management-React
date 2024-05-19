import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../store/auth";
import { Gallery } from "react-images";
import "./Gallery.css";

function ServiceDetails() {
  const { id } = useParams();
  const { services } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State variable to manage gallery modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State variable to track current image index

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

  if (!service) {
    return <div>Loading...</div>;
  }

  // Function to open gallery modal and set current image index
  const openGallery = () => {
    setIsOpen(true);
  };

  // Function to close gallery modal
  const closeGallery = () => {
    setIsOpen(false);
  };

  // Render the single image initially
  const renderSingleImage = () => {
    return (
      <>
        <div className="container mx-auto bg-slate-400 py-10">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 ">
              {service.images.map((image, index) => (
                <img
                  key={index}
                  src={`/uploads/${image}`}
                  alt=""
                  onClick={() => {
                    setCurrentImageIndex(index);
                    openGallery();
                  }}
                  className="cursor-pointer"
                />
              ))}
            </div>
            <div className="md:col-span-1">
              <h1 className="text-2xl font-bold mb-4">{service.businessName}</h1>
              <p className="mb-2">
                <i className="bi bi-geo-alt"></i> {service.stateName},{" "}
                {service.cityName}
              </p>
              <p className="mb-2">Price: {service.price}</p>
              <div className="flex mb-2">
                <div className="whatsapp mr-2">
                  <i className="bx bx-phone bx-tada"></i>
                  <a
                    href={`tel:${service.contact}`}
                    target="_blank"
                    id="Contact-no"
                  >
                    {service.contact}
                  </a>
                </div>
                <div className="phone">
                  <a href={`https://wa.me/${service.contact}`}>
                    <i
                      className="bx bxl-whatsapp bx-tada"
                      style={{ color: "#45a107" }}
                    ></i>{" "}
                    Chat
                  </a>
                </div>
              </div>
              <div className="ServiceCart">
                <a href="">
                  <box-icon name="cart-add"></box-icon>
                </a>
              </div>
            </div>
          </div>
          <div className="my-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p>{service.description}</p>
          </div>
        </div>
      </>
    );
  };

  // Render the gallery view
  const renderGallery = () => {
    return (
      <Gallery
        currentIndex={currentImageIndex}
        views={service.images.map((image) => ({
          src: `/uploads/${image}`,
        }))}
        onClose={closeGallery}
      />
    );
  };

  return isOpen ? renderGallery() : renderSingleImage();
}

export default ServiceDetails;
