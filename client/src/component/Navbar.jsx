import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

function Navbar() {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const [data, setData] = useState({
    username: "",
  });
  const { user } = useAuth();

  const [userData, setUserData] = useState(true);

  if (user && userData) {
    setData({
      username: user.username,
    });
    setUserData(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <>
      <nav className="  fixed top-0 left-0 right-0 z-50 ">
        <div className=" chetan mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
               
                
                <img src="./images/favicon.ico" alt="" 
                onClick={toggleSidePanel}
                />

                <Link className="logo"
                to="/">
                Event Horizon
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4"></div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isLoggedIn ? (
                <button
                  type="button"
                  className="text-gray-400 relative flex rounded-full p-2  bg-gray-800 text-xl ring-2   "
                  onClick={toggleSidePanel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-6 w-6"
                  >
                    <path
                      fill="#FFD43B"
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                    />
                  </svg>
                </button>
              ) : (
                <div className="flex">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div
          className={` sidepanel fixed inset-y-0 right-0 z-50 mt-50 md:w-80 w-64  bg-gray-800 transition-transform duration-300 ease-in-out transform border-gray-900 border-1 rounded-tl-xl rounded-bl-xl ${
            isSidePanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="sidepanel flex items-center justify-between px-4 pt-6 border-b-2 border-opacity-10 pb-6 border-gray-200">
            <Link
              className=" flex items-center gap-2 justify-between mx-3 "
              to="/"
              onClick={toggleSidePanel}
            >
              <img
                className="h-8 w-auto"
                src="/images/favicon.ico"
                alt="Event Horizon"
              />
              <b className="  text-sm logo " style={{fontSize:"1.2rem", color:"cyan"}}>Event Horizon</b>
            </Link>

            <div>
              <button
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none text-2xl"
                onClick={toggleSidePanel}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center mx-3">
                <span className="text-black uppercase font-serif">
                  {data.username.charAt(0)}
                </span>
              </div>
              <p className="text-white">{data.username}</p>
            </div>
          </div>

          <div className="px-4 py-6 text-white">
            {/* Add your side panel content here */}
            {/* For example: */}
            

            <div className="flex">
              <Link
                onClick={toggleSidePanel}
                to="/profile"
                className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-6 items-center justify-center "
              >
                <div>
                  <i className="bi bi-person-square"></i>
                </div>
                <div>Profile</div>
              </Link>
            </div>
            <div className="flex">
              <Link
                onClick={toggleSidePanel}
                to="/services"
                className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-4 items-center justify-center "
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 512 512"
                    viewBox="0 0 512 512"
                    id="service"
                    height="24px"
                    width="24px"
                  >
                    <path
                      fill="#ffffff"
                      d="M505.329 324.301c-12.496-7.39-28.143-8.585-42.107-2.392 0 0-.054.056-.272.109-.054.054-.163.054-.218.109.054 0 0 0-.163.054l-.109.054-.054.054c-.217.054-.435.163-.706.272-5.107 2.281-25.047 11.138-92.852 41.129v-.109c-15.213-21.569-41.998-5.651-78.291-2.5-56.287-28.849-109.423-57.101-167.72-55.309v115.454h9.671l121.05 47.812c19.777 7.823 42.215 5.814 60.362-5.324l191.517-118.17C513.315 340.654 513.37 329.027 505.329 324.301zM100.649 291.555h-9.716v-7.268c0-5.681-4.604-10.285-10.285-10.285H10.932c-5.681 0-10.285 4.604-10.285 10.285v164.742c0 5.681 4.604 10.285 10.285 10.285h69.716c5.681 0 10.285-4.604 10.285-10.285v-7.268h9.716c6.263 0 11.34-5.078 11.34-11.341V302.896C111.99 296.633 106.912 291.555 100.649 291.555zM59.471 443.539c-6.99 0-12.716-5.725-12.716-12.715 0-6.989 5.726-12.715 12.716-12.715 6.989 0 12.715 5.726 12.715 12.715C72.186 437.814 66.46 443.539 59.471 443.539z"
                    ></path>
                    <path
                      fill="#ffffff"
                      d="M193.495,195.43l21.725,2.498c2.607,11.297,7.06,22.16,13.252,31.937l-13.687,17.163c-3.584,4.562-3.15,10.971,0.869,14.99l14.99,14.99c4.019,4.019,10.428,4.454,14.99,0.869l17.163-13.686c9.776,6.192,20.638,10.645,31.936,13.251l2.498,21.726c1.702,15.038,21.441,8.544,32.262,9.993c5.757,0,10.537-4.237,11.189-9.993l2.498-21.726c11.298-2.606,22.16-7.061,31.936-13.253l17.163,13.688c4.562,3.584,10.971,3.15,14.99-0.869l14.99-14.99c4.019-4.019,4.454-10.428,0.87-14.991l-13.687-17.163c6.192-9.776,10.645-20.638,13.252-31.935l21.725-2.499c5.757-0.651,9.993-5.43,9.993-11.189v-21.073c0-5.757-4.236-10.536-9.993-11.189l-21.725-2.499c-2.607-11.296-7.06-22.16-13.252-31.935l13.687-17.163c3.584-4.562,3.15-10.971-0.87-14.99l-14.99-14.99c-4.019-4.019-10.428-4.454-14.99-0.869l-17.163,13.686c-9.776-6.192-20.638-10.645-31.936-13.251l-2.498-21.726c-0.652-5.758-5.431-9.993-11.189-9.993h-21.073c-5.757,0-10.537,4.237-11.189,9.993l-2.498,21.726c-11.298,2.606-22.16,7.059-31.936,13.251l-17.163-13.686c-4.562-3.584-10.971-3.149-14.99,0.87l-14.99,14.99c-4.019,4.019-4.453,10.427-0.869,14.99l13.687,17.162c-6.192,9.777-10.645,20.639-13.252,31.937l-21.725,2.499c-5.757,0.651-9.993,5.432-9.993,11.189v21.073C183.502,190,187.738,194.779,193.495,195.43z M284.001,138.859c19.301-19.301,50.52-19.301,69.821,0c19.171,19.171,19.171,50.519,0,69.691c-19.301,19.301-50.52,19.301-69.821,0C264.7,189.379,264.7,158.03,284.001,138.859z"
                    ></path>
                  </svg>
                </div>
                <div>Services</div>
              </Link>
            </div>
            <div className="flex">
              <Link
                onClick={toggleSidePanel}
                to="/favorites"
                className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-6 items-center justify-center "
              >
                <div>
                  <i className="bi bi-suit-heart"></i>
                </div>
                <div>Favorites</div>
              </Link>
            </div>
            <div className="flex">
              <Link
                onClick={toggleSidePanel}
                to="/business"
                className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-6 items-center justify-center "
              >
                <div>
                  <i className="bi bi-pencil-square"></i>
                </div>
                <div>Share Your Business</div>
              </Link>
            </div>

            <div className=" rounded-sm border-t-2 border-gray-200 border-opacity-10 mt-5 ">
              <div className="flex mt-3">
                <Link
                  to="/contact"
                  onClick={toggleSidePanel}
                  className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-6 items-center justify-center "
                >
                  <div>
                    <i className="bi bi-headset"></i>
                  </div>
                  <div>Contact Us</div>
                </Link>
              </div>

              <div className="flex   ">
                <Link
                  to="/logout"
                  onClick={toggleSidePanel}
                  className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-6 items-center justify-center "
                >
                  <div>
                    <i className="bi bi-box-arrow-right"></i>
                  </div>
                  <div>Logout</div>
                </Link>
              </div>
              <div className="flex rounded-sm border-t-2 border-opacity-10 mt-5 border-gray-200">
                <Link
                  to="/termscondition"
                  onClick={toggleSidePanel}
                  className=" px-4 py-2 text-lg hover:text-gray-200 flex gap-6 items-center justify-center "
                >
                  <div>
                    <i className="bi bi-file-earmark-check"></i>
                  </div>
                  <div>Terms & Conditions</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
