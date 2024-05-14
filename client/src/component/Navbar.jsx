import React from "react";
import "./Navbar.css"
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Logo</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                
                <NavLink to="/"> Home</NavLink> 
              </li>
              <li>
                
                <NavLink to="/register"> Register</NavLink> 
              </li>
              <li>
                
                <NavLink to="/about"> about</NavLink> 
              </li>
              <li>
                
                <NavLink to="/login"> Login</NavLink> 
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
