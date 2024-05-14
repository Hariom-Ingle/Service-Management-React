import "./Navbar.css"
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

function Navbar() {
  const {isLoggedIn }=useAuth()
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
                
                <NavLink to="/about"> about</NavLink> 
              </li>
              {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>

              

              ):(
<>
<ul>


              <li>
                
                <NavLink to="/register"> Register</NavLink> 
              </li>
              <li>
                
                <NavLink to="/login"> Login</NavLink> 
              </li>
              </ul>


</>

              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
