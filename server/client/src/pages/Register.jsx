import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const Navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    // database Connetction
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log(res_data);
      console.log(res_data.message);
      if (response.ok) {
        storeTokenInLS(res_data.token); //store  token by creating a function
        toast.success("Registered  Succefully");
        // localStorage.setItem("token", res_data.token); // by general method

        setUser({
          username: "",
          email: "",
          password: "",
        });
        Navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
      console.log(response);
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className=" flex  text-center flex-col">
          <img
            className="mx-auto h-14 w-auto"
            src="/images/favicon.ico"
            alt="Event Horizon"
          />
<h1 className="logo" style={{fontSize:"1.4rem", color:"black"}}> Event Horizon</h1>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  placeholder="Enter Your username"
                  type="username"
                  autoComplete="username"
                  required
                  value={user.username}
                  onChange={handleInput}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  onChange={handleInput}
                  value={user.email}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={handleInput}
                  value={user.password}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already  have an account? 
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mx-1"
            >
                 Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
