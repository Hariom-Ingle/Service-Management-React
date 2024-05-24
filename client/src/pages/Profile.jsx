import React, { useContext } from "react";
import { AuthContext } from "../store/auth";

function Profile() {
  const { services, deleteService, user } = useContext(AuthContext);

  console.log("profile user.",user);

  return (
    <div className="grid md:grid-cols-3 mt-24">
      <div className="w-4/5 m-5 bg-gray-50 shadow-[0_10px_5px_rgba(8,_112,_184,_0.7)] rounded-md " >
        
          <div>
            <h2 className=" font-bold"> Personal Details </h2>
          </div>
          <div className="p-2">
            {/* <label >UserName</label> */}
   
            {/* <p>{user.username}</p> */}
          </div>
          <div className="p-2">
          <label >Email</label>

            {/* <p>{user.email}</p> */}
          </div>
      
      </div>
      <div className=" md:col-span-2"></div>
    </div>
  );
}

export default Profile;
