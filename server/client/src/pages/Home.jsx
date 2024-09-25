import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { useAuth } from "../store/auth";

export const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <section
        style={{ height: "90vh", position: "relative" }}
        className=" mt-20 mb-24 md:mb-3"
      >
        <img
          src="/images/dotted4.png"
          // width="150px"
          className=" opacity-5"
          style={{ position: "absolute", top: -80, left: 0, zIndex: -1 }}
          alt=""
        />
        <div className="home-section h-full  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-2xl md:text-5xl mx-8 text-black font-bold md:leading-10">
                Better Way to Manage Your Events !!
              </h1>
              <ul className="m-8">
                <li className="text-xl">
                  <span>
                    <i className="bi bi-check2-all text-white mx-2"></i>
                  </span>
                  Find hotels and venues
                </li>
                <li className="text-xl">
                  <span>
                    <i className="bi bi-check2-all text-white mx-2"></i>
                  </span>
                  Plan and promote your event
                </li>
                <li className="text-xl">
                  <span>
                    <i className="bi bi-check2-all text-white mx-2"></i>
                  </span>
                  Engage your attendees
                </li>
                <li className="text-xl">
                  <span>
                    <i className="bi bi-check2-all text-white mx-2"></i>
                  </span>
                  Enjoy the event
                </li>
                <li className="text-xl">
                  <span>
                    <i className="bi bi-check2-all text-white mx-2"></i>
                  </span>
                  Make your dream event a reality
                </li>
              </ul>
              <div className="mx-10">
                <Link to={isLoggedIn ? "/services" : "/register"}>
                  <button className="explore-btn border-2 rounded-md p-2 bg-blue-300">
                    Explore the Platform
                  </button>
                </Link>
              </div>
            </div>

            {/* Part 2: Image Grid */}
            <div className="image-grid">
              <img src="server/client/images/herosec.webp" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section  className=" h-3/4">
        <div className=" ">
          <h1 className="text-2xl text-center md:text-4xl mx-2 mb-5 text-black font-bold md:leading-10 mt-10">
            Explore Our Offerings
          </h1>
          <div className="grid grid-cols-3 md:grid-cols-5 sm:grid-cols-5 md:mx-40">
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/wedding-couple.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Wedding</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/makeover.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Makeover</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/dj.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Dj</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/decoration.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Decoration</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/photography.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Photography</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="server/client/images/hotel.png"
                  alt="Hotel "
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Hotel</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/dress.png"
                  alt="dresss"
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Dressing</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/restaurant.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Restaurants</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/bdy.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Food & bevurage</p>
            </Link>
            <Link to="/services" className="flex flex-col items-center">
              <button>
                <img
                  src="/images/int.png"
                  alt=""
                  className="p-1 border-2 rounded-lg w-24 mt-7"
                />
              </button>
              <p className="text-center">Interior Design</p>
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{ height: "90vh", position: "relativ" }}
        className="  mb-24 md:mb-3"
      >
        <div className="home-section h-full mt-36  mb-36 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-2xl md:text-5xl mx-8 text-black font-bold md:leading-10">
                About The Event Horizon
              </h1>
              <ul className="m-8">
                <li className="text-lg">
                  <span>
                    {/* <i className="bi bi-check2-all text-pink-500 mx-2"></i> */}
                  </span>
                  <span className="text-white text-bold text-xl ">Welcome</span>{" "}
                  to The Event Horizon, your premier destination for hassle-free
                  event planning in Yavatmal City, Maharashtra. Founded with a
                  vision to revolutionize event organization, we are dedicated
                  to providing our customers with the best selection of
                  services, all at your fingertips.
                </li>
                <li className="text-lg mt-2">
                  <span>
                    {/* <i className="bi bi-check2-all text-pink-500 mx-2"></i> */}
                  </span>
                  Discover a world of possibilities with The Event Horizon.
                  Whether you're planning a wedding, a corporate event, or a
                  family celebration, we offer a variety of services to suit
                  your needs. From booking lawns and wedding halls to arranging
                  decorations, DJs, and food catering, we've got you covered.
                </li>
              </ul>
            </div>

            {/* Part 2: Image Grid */}
            <div className="image-grid">
              <img src="/images/aboutus.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="h-full mb-0 mt-56 md:mt-5">
        <Footer />
      </section>
    </>
  );
};
