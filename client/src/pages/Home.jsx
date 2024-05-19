import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

// const defaultContactFormData = {
//   username: "",
//   email: "",
//   message: "",
// };

export const Home = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { user } = useAuth();

  // console.log("frontend user ", user);

  const [userData, setUserData] = useState(true);

  if (userData && user) {
    setData({
      username: user.username,
      email: user.email,
      message: "",
    },
  );
    setUserData(false);
  }

  const handleInput = (e) => {
    // console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* <h1>Contact Page</h1> */}
        <div className="container grid grid-half-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="always ready to help you" />
          </div>

          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>
             
              <div>
                <button type="submit"> Submit </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};
