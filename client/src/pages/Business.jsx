import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { useAuth } from "../store/auth";

function Service() {
  const { handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const [details, setDetails] = useState({
    businessName: "",
    serviceName: "",
    cityName: "",
    stateName: "",
    address: "",
    businessLocation: "",
    contact: "",
    email: user?.email || "", // Set the default email value from user
    price: ""
  });

  useEffect(() => {
    // Set the email from user context when the component mounts
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
      setImages(Array.from(files)); // Update images state with multiple files
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }

    console.log(details);
  };

  const onSubmit = async () => {
    const formData = new FormData();

    // Append text input fields to formData
    Object.keys(details).forEach((key) => {
      formData.append(key, details[key]);
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
              <h5 className="text-xl font-semibold mb-4">
                Business Information
              </h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="businessName"
                  >
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
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="serviceName"
                  >
                    Name of Service
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="serviceName"
                    name="serviceName"
                    onChange={onInputChange}
                    placeholder="Lawn/Catering/DJ"
                    required
                  />
                </div>
              </div>

              <h5 className="text-xl font-semibold mb-4 mx-2">
                Address Information
              </h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="stateName"
                  >
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
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="cityName"
                  >
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
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="address"
                  >
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
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="businessLocation"
                  >
                    Share your business location
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

              <h5 className="text-xl font-semibold mb-4 mx-2">
                Additional Information
              </h5>

              <div className="flex flex-wrap px-5 py-2 md:space-x-4">
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="email">
                    Email Id
                  </label>
                  <input
                    type="email"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="email"
                    name="email"
                    value={details.email}
                    readOnly
                  />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label
                    className="block font-bold mb-2 mt-4"
                    htmlFor="contact"
                  >
                    Contact
                  </label>
                  <input
                    type="tel"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="contact"
                    name="contact"
                    onChange={onInputChange}
                    placeholder="Enter contact"
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
                    onChange={onInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div className="w-full md:w-[calc(50%-1rem)] px-2 mt-5 mb-4 border-solid bg-blue-50 rounded-xl">
                  <label className="block font-bold mb-2 mt-4" htmlFor="image">
                    Images
                  </label>
                  <input
                    type="file"
                    className="form-control w-full border p-2 rounded mt-1 mb-5"
                    id="image"
                    name="image"
                    multiple
                    accept="image/*"
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
             
              <h5 className="text-xl font-semibold mb-4 mx-2">
                Description Content
              </h5>

              <div className="mb-10 px-5 py-2 z-0">
                <JoditEditor
                  ref={editor}
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                />
              </div>

              <div className="flex items-center mb-4 px-2">
                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  className="mr-2"
                  required
                />
                <label htmlFor="agreeCheckbox">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="px-2">
                <button
                  type="submit"
                  id="submitButton"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
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
