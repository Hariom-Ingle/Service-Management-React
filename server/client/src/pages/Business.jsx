import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../store/auth";

const servicesData = [
  "Catering",
  "DJ Services",
  "Cleaning",
  "Lawn",
  "Hotel",
  "Decoration",
  "Photography",
];

function Business() {
  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  const [termsChecked, setTermsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude},${longitude}`;
          setDetails((prevDetails) => ({
            ...prevDetails,
            businessLocation: locationString,
          }));
        },
        (error) => {
          toast.error("Error getting location.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

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

    const url = id ? `/api/business/upload/${id}` : `http://localhost:5000/api/business/upload`;

    try {
      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log("Response data:", responseData);
      toast.success("Data uploaded successfully!");
      setShowIcon(true);
      setTimeout(() => {
        setShowIcon(false);
        reset();
        navigate("/services");
      }, 2000);
    } catch (error) {
      toast.error("Error uploading data.");
      console.error("Error uploading data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-5 bg-gray-40 mb-5">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center mt-5">
          <div className="w-full lg:w-3/4 mt-1">
            <form
              id="business-form"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <h5 className="text-xl font-semibold mt-24 mb-4 text-black">Business Information</h5>

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
                    {details.serviceName.map((service) => (
                      <span
                        key={service}
                        className="inline-block bg-blue-300 text-black py-1 px-2 rounded-full text-sm mr-2 mb-2"
                      >
                        {service}
                        <button
                          type="button"
                          className="ml-2 text-sm"
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
                    placeholder="Enter state"
                    required
                  />
                </div>
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
                    placeholder="Enter city"
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
                  <div className="flex">
                    <input
                      type="text"
                      className="form-control w-full border p-2 rounded mt-1 mb-5"
                      id="businessLocation"
                      name="businessLocation"
                      value={details.businessLocation}
                      onChange={onInputChange}
                      placeholder="Enter business location Latitude, Longitude"
                      required
                    />
                    <button
                      type="button"
                      className="bg-blue-500 text-white p-2 rounded ml-2 mt-1 mb-5"
                      onClick={getCurrentLocation}
                    >
                      Use current location
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="contact">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="contact"
                    name="contact"
                    value={details.contact}
                    onChange={onInputChange}
                    placeholder="Enter contact number"
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
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4 hidden ">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="price">
                    Price Range
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="price"
                    name="price"
                    value={details.price}
                    onChange={onInputChange}
                    placeholder="Enter price range"
                  
                  />
                </div>
              </div>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="description">
                    Description
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
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
                    multiple
                    onChange={handleImageUpdate}
                  />
                  <div className="flex flex-wrap mt-2">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative w-32 h-32 m-2">
                        <img
                          src={url}
                          alt={`Selected image ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => removeImage(index)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="terms"
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                />
                <label htmlFor="terms" className="ml-2">
                  I agree to the{" "}
                  <Link to="/terms" target="_blank" className="text-blue-500 underline">
                    terms and conditions
                  </Link>
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`btn px-4 py-2 rounded-md text-white font-semibold ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} transition duration-300`}
                  disabled={isSubmitting}
                >
                  <span>Submit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`sub-icon w-6 h-6 ml-2 ${showIcon ? "block" : "hidden"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
