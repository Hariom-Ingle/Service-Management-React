import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth";
import { Link } from "react-router-dom";

function Profile() {
  const { services, user } = useContext(AuthContext);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    if (user && services) {
      setFilteredServices(services.filter(service => service.email === user.email));
    }
  }, [services, user]);

  if (!user) {
    return (
      <section style={{ height: "100vh" }} className="flex items-center justify-center">
        <p>Loading user information...</p>
      </section>
    );
  }

  return (
    <section >
      <div className="grid lg:grid-cols-3 mt-24 justify-center align-center" >
        <div className="  h-2/4  bg-gray-50 shadow-[0_10px_5px_rgba(8,_112,_184,_0.7)] rounded-md">
          <div className="flex justify-center text-center">
            <div className="h-20 w-20 mt-2 rounded-full bg-gray-400 flex items-center justify-center mx-3">
              <span className="text-black uppercase text-4xl font-serif">
                {user.username ? user.username.charAt(0) : 'H'}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5 m-5">
            <p className="text-xl">{user.username}</p>
            <p className="text-xl">{user.email}</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="mt-6">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service._id} className="p-4 m-2 lg:mx-10 mb-4 bg-gray-200 rounded-xl shadow-[0_0px_3px_rgba(8,_112,_184,_0.7)]">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 w-full md:w-80 flex justify-center">
                      {service.images && service.images[0] ? (
                        <img
                          src={`./uploads/${service.images[0]}`}
                          alt="Business"
                          className="rounded-xl w-full h-64 object-cover mb-2"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-300 rounded-xl mb-2" />
                      )}
                    </div>
                    <div className="flex flex-col justify-self-stretch ml-0 md:ml-6 mt-4 md:mt-0 relative w-full">
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl pr-5 font-bold">
                          {service.businessName}
                        </h2>
                      </div>
                      <div className="flex gap-1.5 mb-4">
                        {[...Array(3)].map((_, index) => (
                          <i key={index} className="bi bi-star-fill text-yellow-500"></i>
                        ))}
                        <i className="bi bi-star-half text-yellow-500"></i>
                        <i className="bi bi-star text-yellow-500"></i>
                      </div>
                      <div className="flex gap-2 mb-4">
                        {Array.isArray(service.serviceName) ? (
                          service.serviceName.map((name, index) => (
                            <button
                              key={index}
                              className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md"
                            >
                              {name}
                            </button>
                          ))
                        ) : (
                          <button className="border border-sky-500 bg-gray-300 py-1 px-2 text-xs rounded-md">
                            {service.serviceName}
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2 mb-4">
                        <i className="bi bi-geo-alt">
                          {service.address}
                        </i>
                      </div>
                      <div className="pt-2 flex gap-4 mt-4">
                        <Link to={`tel:${service.contact}`} className="no-underline">
                          <button className="rounded-lg py-1.5 px-2.5 bg-green-700 text-white">
                            <i className="bi bi-telephone"></i> {service.contact}
                          </button>
                        </Link>
                        <Link to="https://wa.link/ldhknj" className="no-underline">
                          <button className="rounded-lg py-1.5 px-2.5 bg-green-700 text-white">
                            <i className="bi bi-whatsapp"></i> Chat
                          </button>
                        </Link>
                        <Link to={`/Service/${service._id}`}>
                          <button className="rounded-lg border-2 border-black border-opacity-5 py-1.5 px-2.5 text-black">
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img src="images/shopping.png" alt="No services found." className="m-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
