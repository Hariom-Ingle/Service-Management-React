import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <section style={{height:"100vh"}} id="error-page" className="flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <h2 className="header text-9xl animate-gradient">404</h2>
          <h4 className="text-4xl mb-8">Sorry! Page not found</h4>
          <p className="mb-8">
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="btns">
            <NavLink to="/" className="inline-block px-6 py-3 mr-4 text-white bg-blue-500 rounded-full hover:bg-blue-600">return home</NavLink>
            <NavLink to="/contact" className="inline-block px-6 py-3 text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white">report problem</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};
