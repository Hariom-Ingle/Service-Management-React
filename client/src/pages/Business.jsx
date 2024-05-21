import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useAuth } from "../store/auth";

// Sample JSON data for services
const servicesData = [
  "Lawn Care",
  "Catering",
  "DJ Services",
  "Cleaning",
  "Lawn",
  "Hotel",
  "Decoration",
];

function Service() {
  const { handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const [details, setDetails] = useState({
    businessName: "",
    serviceName: [], // Modify to accept an array
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

  useEffect(() => {
    if (user && user.email) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        email: user.email,
      }));
    }
  }, [user]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setImages(Array.from(files));
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
    // Modify to accept multiple services
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

  const removeImage = (imageIndex) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== imageIndex));
  };

  const onSubmit = async () => {
    const formData = new FormData();

    // Append text input fields to formData
    Object.keys(details).forEach((key) => {
      if (key === "serviceName") {
        formData.append(key, JSON.stringify(details[key])); // Stringify the serviceName array
      } else {
        formData.append(key, details[key]);
      }
    });

    // Append the HTML content from the editor to formData
    formData.append("description", content);

    // Append image file(s) to formData
    images.forEach((image) => {
      formData.append("images", image);
    });

    // Log the formData before submitting
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/business/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log("Data uploaded:", responseData);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <section className="pt-5 bg-gray-40">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center mt-5">
          <div className="w-full lg:w-3/4 mt-1">
            <form
              id="business-form"
              className=""
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

              <h5 className="text-xl font-semibold mb-4 mx-2">Address Information</h5>

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
                    onChange={onInputChange}
                    placeholder="Enter business location"
                    required
                  />
                </div>
              </div>

              <h5 className="text-xl font-semibold mb-4 mx-2">Contact Information</h5>

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

              <h5 className="text-xl font-semibold mb-4 mx-2">Pricing Information</h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="price"
                    name="price"
                    onChange={onInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <h5 className="text-xl font-semibold mb-4 mx-2">Images</h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={onInputChange}
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                  />
                  {images.length > 0 && (
                    <div className="mt-2">
                      {images.map((image, index) => (
                        <div key={index} className="inline-block mr-2">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            className="block text-red-500 mt-1"
                            onClick={() => removeImage(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <h5 className="text-xl font-semibold mb-4 mx-2">Description</h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1}
                    onChange={(newContent) => setContent(newContent)}
                  />
                </div>
              </div>


              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full"
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

export default Service;
