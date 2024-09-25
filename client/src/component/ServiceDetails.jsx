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
import StarRating from "./StarRating"; // Import the StarRating component

function ServiceDetails() {
  const { id } = useParams();
  const { services, deleteService, user, addReview, fetchServiceReviews } =
    useContext(AuthContext);
  const [service, setService] = useState(null);
  const [businessLocation, setBusinessLocation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const galleryRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const serviceData = services.find((s) => s._id === id);
    if (serviceData) {
      setService(serviceData);
      setBusinessLocation(serviceData.businessLocation);
    } else {
      console.error("Service not found");
    }
  }, [id, services]);

  useEffect(() => {
    if (galleryRef.current && service) {
      lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        licenseKey: "your_license_key",
        speed: 500,
      });
    }
  }, [service]);

  useEffect(() => {
    const fetchReviews = async () => {
      const serviceReviews = await fetchServiceReviews(id);
      setReviews(serviceReviews);
    };
    fetchReviews();
  }, [id, fetchServiceReviews]);

  const handleEditClick = () => {
    navigate(`/business/${service._id}`, { state: { service } });
  };

  const handleDeleteClick = async () => {
    try {
      await deleteService(service._id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const openMaps = () => {
    if (businessLocation) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${businessLocation}`
      );
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(id, { rating, comment });
      setRating(0);
      setComment("");
      const serviceReviews = await fetchServiceReviews(id);
      setReviews(serviceReviews);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  const images = service.images
    ? service.images.map((image) => `/uploads/${image}`)
    : [];
  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      ).toFixed(1)
    : 0;

  return (
    <>
      <div className="container mx-auto md:w-4/5 mt-24 w-11/12 rounded-md bg-gray-50 shadow-[0_10px_5px_rgba(8,_112,_184,_0.7)] py-10">
        <div className="grid grid-cols-1 mx-2 md:grid-cols-1 gap-8">
          <div className="grid grid-cols-2 gap-1 md:px-40">
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative col-span-1">
                <img
                  src={image}
                  alt="Service"
                  onClick={() =>
                    galleryRef.current
                      .querySelector(`a[href="${image}"]`)
                      .click()
                  }
                  className="cursor-pointer w-full h-full object-cover"
                />
                {index === 3 && images.length > 4 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold"
                    onClick={() =>
                      galleryRef.current
                        .querySelector(`a[href="${image}"]`)
                        .click()
                    }
                  >
                    More
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:mx-20 mx-2  lg:grid-cols-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)] rounded-xl">
              <div>
                <div className="">
                  <h1 className="text-2xl font-bold mb-2">
                    {service.businessName}
                  </h1>
                  <StarRating rating={averageRating} />
                  {/* Display star rating */}
                </div>

                <div className="pt-2 md:flex gap-4 mb-2">
                  <p className="mb-2">
                    <i className="bi bi-geo-alt"></i>
                    {service.address}, {service.cityName}, {service.stateName}
                  </p>
                </div>
                <div className="flex gap-2 mb-4">
                  {service.serviceName ? (
                    Array.isArray(service.serviceName) ? (
                      service.serviceName.map((name, index) => (
                        <button
                          key={index}
                          className="rounded-full bg-[#50c4ea] text-white text-xs px-3 py-1"
                        >
                          {name}
                        </button>
                      ))
                    ) : (
                      <button className="rounded-full bg-[#50c4ea] text-white text-xs px-3 py-1">
                        {service.serviceName}
                      </button>
                    )
                  ) : null}
                </div>
                <div className="flex gap-5 mb-2">
                  <Link to={`tel:${service.contact}`} className="no-underline">
                    <button
                      className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white`}
                    >
                      <i className="bi bi-telephone"></i>{" "}
                      {service.contact || <Skeleton width={100} />}
                    </button>
                  </Link>
                  <Link
                    to={`https://wa.me/?text=${service.contact}`}
                    className="no-underline"
                  >
                    <button
                      className={`rounded-lg py-1.5 px-2.5 bg-green-700 text-white`}
                    >
                      <i className="bi bi-whatsapp"></i> Chat
                    </button>
                  </Link>
                  <button
                    onClick={openMaps}
                    className="bg-[#0870B8] hover:bg-[#1A8CD8] text-white py-1 px-4 rounded"
                  >
                    Get Direction
                  </button>
                </div>
              </div>
              <div className="flex justify-end items-start">
                {user?.email === service.email && (
                  <div className="space-x-2">
                    <button
                      onClick={handleEditClick}
                      className="bg-[#0870B8] hover:bg-[#1A8CD8] text-white py-1 px-2 rounded"
                    >
                      <i className="bi bi-pencil-square mx-2"></i>
                      Edit
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
                    ><i className="bi bi-trash mx-2"></i>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-1 mt-5">
              <div className="shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)] rounded-xl mb-4">
                <p className="font-bold text-lg mx-5">Description:</p>
                <div
                  className="overflow-scroll"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
              <div className="mt-20 mb-20">
                <div>
                  <h1 className="text-xl border-b-2 mb-10">Feedback</h1>
                </div>
                <ul>
                  {reviews.map((review, index) => (
                    <li key={index} className="mb-4 border-b-2">
                      <div className="flex justify-between">
                        <p className="font-bold">{review.user}</p>                        <p>{review.rating} / 5</p>
                      </div>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)] rounded-xl p-5">
                <h2 className="text-xl font-bold mb-2">Reviews</h2>
                <p>Average Rating: {averageRating} / 5</p>
                <StarRating rating={averageRating} />{" "}
                {/* Display average rating as stars */}
                <form onSubmit={handleReviewSubmit} className="mb-4">
                  <div className="mb-2">
                    <label className="block mb-1" htmlFor="rating">
                      Rating:
                    </label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full border border-gray-300 rounded py-2 px-3"
                      required
                    >
                      <option value="">Select a rating</option>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1" htmlFor="comment">
                      Comment:
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border border-gray-300 rounded py-2 px-3"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0870B8] hover:bg-[#1A8CD8] text-white py-1 px-4 rounded"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden">
          <div ref={galleryRef}>
            {images.map((image, index) => (
              <Link key={index} href={image}>
                <img src={image} alt={`Gallery Image ${index + 1}`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceDetails;

                        
                       
