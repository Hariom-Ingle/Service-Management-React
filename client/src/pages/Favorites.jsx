import React from "react";
import { useAuth } from "../store/auth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Favorites() {
  const { services, likedServices } = useAuth();

  const likedServicesList = services.filter((service) =>
    likedServices.includes(service._id)
  );

  return (
    <div>
      <h2>Liked Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {likedServicesList.length > 0 ? (
          likedServicesList.map((service) => (
            <div key={service._id} className="border p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2">{service.businessName || <Skeleton />}</h3>
              <p className="text-gray-600">{service.address || <Skeleton />}</p>
              <p className="text-gray-600">{service.contact || <Skeleton />}</p>
            </div>
          ))
        ) : (
          <p>No liked services yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
