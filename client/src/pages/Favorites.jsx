import React from "react";
import { useAuth } from "../store/auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

function Favorites() {
  const { services, likedServices } = useAuth();
  
  const likedServicesList = services.filter((service) =>
    likedServices.includes(service._id)
  );
  
  console.log(likedServices)

  return (
    <div className="mt-24 " style={{ height: "90vh", position:"relative" }}>
    
      <div className="grid md:grid-cols- lg:grid-cols-2 gap-6 mt-6">
        {likedServicesList.length > 0 ? (
          likedServicesList.map((service) => (
            <div key={services._id} className="border p-4 rounded shadow-md mx-10 ">
              <h3 className="text-lg font-semibold mb-2">
                {service.businessName || <Skeleton />}
              </h3>
              <p className="text-gray-100">{service.address || <Skeleton />}</p>
              <p className="text-gray-100">{service.contact || <Skeleton />}</p>
              
              <Link to={`/favorites/${services._id}`}>
                    <button className="rounded-lg border-2 border-black border-opacity-5 py-1.5 px-2.5 text-black">
                      Details
                    </button>
                  </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col align-items-center justify-center">
            <img
              src="images/shopping.png"
              alt="No liked services yet."
              className="m-auto"
            />
            <h1 className="m-auto">  No liked services yet.</h1>
          </div>

          // <p>No liked services yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
