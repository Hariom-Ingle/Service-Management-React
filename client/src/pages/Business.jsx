import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useAuth } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useLocation } from "react-router-dom";

const servicesData = [
  "Lawn Care",
  "Catering",
  "DJ Services",
  "Cleaning",
  "Lawn",
  "Hotel",
  "Decoration",
];

function Business() {
  const { handleSubmit, register, errors } = useForm();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const serviceToEdit = location.state?.service;

  const [details, setDetails] = useState({
    businessName: "",
    serviceName: [],
    cityName: "",
    stateName: "",
    address: "",
    businessLocation: "",
    contact: "",
    email: user?.email || "",
    price: "",
  });

  const [serviceInput, setServiceInput] = useState("");
  const [filteredServices, setFilteredServices] = useState(servicesData);

  const handleImageUpdate = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...files]);
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  useEffect(() => {
    if (user && user.email) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        email: user.email,
      }));
    }

    if (serviceToEdit) {
      setDetails({
        businessName: serviceToEdit.businessName,
        serviceName: serviceToEdit.serviceName,
        cityName: serviceToEdit.cityName,
        stateName: serviceToEdit.stateName,
        address: serviceToEdit.address,
        businessLocation: serviceToEdit.businessLocation,
        contact: serviceToEdit.contact,
        email: serviceToEdit.email,
        price: serviceToEdit.price,
      });
      setContent(serviceToEdit.description);
      setImages(serviceToEdit.images || []);
      
      const imageUrls = serviceToEdit.images ? serviceToEdit.images.map(image => `/uploads/${image}`) : [];
      setImageUrls(imageUrls);
    }
  }, [user, serviceToEdit]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setServiceInput(value);

    if (value) {
      const filtered = servicesData.filter((service) =>
        service.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(servicesData);
    }
  };

  const addService = (service) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      serviceName: [...prevDetails.serviceName, service],
    }));
    setServiceInput("");
  };

  const removeService = (service) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      serviceName: prevDetails.serviceName.filter(
        (serviceName) => serviceName !== service
      ),
    }));
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    const formData = new FormData();
    
    Object.keys(details).forEach((key) => {
      if (key === "serviceName") {
        formData.append(key, JSON.stringify(details[key]));
      } else {
        formData.append(key, details[key]);
      }
    });

    formData.append("description", content);

    images.forEach((image) => {
      if (typeof image === 'string') {
        formData.append("existingImages", image);
      } else {
        formData.append("images", image);
      }
    });

    const url = id ? `http://localhost:5000/api/business/upload/${id}` : `http://localhost:5000/api/business/upload`;

    try {
      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        body: formData,
      });
      const responseData = await response.json();
      toast.success("Data uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading data.");
    }
  };

  return (
    <section className="pt-5 bg-gray-40">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center mt-5">
          <div className="w-full lg:w-3/4 mt-1">
            <form
              id="business-form"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <h5 className="text-xl font-semibold mb-4">Business Information</h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="businessName">
                    Name of Business
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="businessName"
                    name="businessName"
                    value={details.businessName}
                    onChange={onInputChange}
                    placeholder="Enter business name"
                    required
                  />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="serviceName">
                    Name of Service
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="serviceName"
                    name="serviceName"
                    value={serviceInput}
                    onChange={handleServiceChange}
                    placeholder="Search for services"
                  />
                  {serviceInput && (
                    <ul className="border bg-white mt-2 rounded shadow">
                      {filteredServices.map((service) => (
                        <li
                          key={service}
                          className="p-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => addService(service)}
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-2">
                    {details.serviceName.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-blue-200 px-2 py-1 rounded-full text-sm mr-2 mt-1"
                      >
                        {service}
                        <button
                          type="button"
                          className="ml-2 text-red-500"
                          onClick={() => removeService(service)}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="cityName">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="cityName"
                    name="cityName"
                    value={details.cityName}
                    onChange={onInputChange}
                    placeholder="Enter city name"
                    required
                  />
                </div>

                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="stateName">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="stateName"
                    name="stateName"
                    value={details.stateName}
                    onChange={onInputChange}
                    placeholder="Enter state name"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="address"
                    name="address"
                    value={details.address}
                    onChange={onInputChange}
                    placeholder="Enter address"
                    required
                  />
                </div>

                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="businessLocation">
                    Business Location
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="businessLocation"
                    name="businessLocation"
                    value={details.businessLocation}
                    onChange={onInputChange}
                    placeholder="Enter business location"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="contact">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="contact"
                    name="contact"
                    value={details.contact}
                    onChange={onInputChange}
                    placeholder="Enter contact"
                    required
                  />
                </div>

                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="email"
                    name="email"
                    value={details.email}
                    onChange={onInputChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="price"
                    name="price"
                    value={details.price}
                    onChange={onInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="images">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="images"
                    name="images"
                    onChange={handleImageUpdate}
                    multiple
                    accept="image/*"
                  />
                  <div className="flex flex-wrap">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative w-24 h-24 mr-2 mb-2">
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="object-cover w-full h-full rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 p-1 text-red-600 bg-white rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-2">
                <label className="block font-bold mb-2 mt-4" htmlFor="description">
                  Description
                </label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  tabIndex={1}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) => {}}
                />
              </div>

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="px-8 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Business;
