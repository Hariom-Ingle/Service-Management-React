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
      <nav className="bg-orange-600 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray- hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                onClick={toggleMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. */}
                <svg
                  className={`block h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {/* Icon when menu is open. */}
                <svg
                  className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img src="./images/favicon.ico" alt="" />
                Event Horizon
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  {/* <Link
                    to="/dashboard"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </Link> */}
                  {/* <Link
                    to="/services"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Team
                  </Link> */}
                </div>
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
          className={`fixed inset-y-0 right-0 z-50 mt-50 md:w-80 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform border-gray-900 border-1 rounded-tl-xl rounded-bl-xl ${
            isSidePanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 pt-6 border-b-2 border-opacity-10 pb-6 border-gray-200">
            <Link
              className=" flex items-center gap-2 justify-between mx-3 "
              to="/"
              onClick={toggleSidePanel}
            >
              <img
                className="h-8 w-auto"
                src="/images/favicon.ico"
                alt="Your Company"
              />
              <b className="  text-cyan-300">Event Horizon</b>
            </Link>

            <div>
              <button
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none"
                onClick={toggleSidePanel}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center mx-3">
                <span className="text-white uppercase">
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
                    enable-background="new 0 0 512 512"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                    />
                  </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 512 512"
                    >
                      {/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                      <path
                        fill="#ffffff"
                        d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"
                      />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="18"
                      height="18"
                    >
                      <path
                        fill="#ffffff"
                        d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                      />
                    </svg>
                  </div>
                  <div>Logout</div>
                </Link>
              </div>
              <div className="flex rounded-sm border-t-2 border-opacity-10 mt-5 border-gray-200">
                <Link
                  to="/logout"
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
