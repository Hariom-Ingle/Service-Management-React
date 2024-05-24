import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white   shadow-lg font-normal h-12 w-12 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <Link to="https://www.instagram.com/mini_art_0?igsh=MTdiZ3B4NjBpOXR3eA==">
                  <i class=" text-2xl bi bi-instagram"></i>
                </Link>
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-12 w-12 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
               <Link to="https://x.com/HariomIngle025">
               
                <i class=" text-2xl bi bi-twitter-x"></i>
               </Link>
              </button>
              <button
                className="bg-white  shadow-lg font-normal h-12 w-12 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
               <Link to="https://www.instagram.com/mini_art_0?igsh=MTdiZ3B4NjBpOXR3eA==">
               
                <i class=" text-2xl bi bi-facebook"></i>
               </Link>
              </button>
              <button
                className="bg-white text-blueGray-800 shadow-lg font-normal h-12 w-12 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
               <Link to=" ">
               
                <i class=" text-2xl bi bi-envelope"></i>
               </Link>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                   
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                   
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    //   href="https://www.github.com/creativetimofficial?ref=njs-profile"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    //   href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    //   href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    //   href="https://creative-tim.com/terms?ref=njs-profile"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    //   href="https://creative-tim.com/privacy?ref=njs-profile"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    //   href="https://creative-tim.com/contact-us?ref=njs-profile"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <a
                
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
              >
                {" "}
                Event Horizon
                <a
                //   href="https://www.creative-tim.com?ref=njs-profile"
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  
                </a>
                .
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
