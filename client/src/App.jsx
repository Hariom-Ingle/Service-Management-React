import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./pages/Home";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import Navbar from "./component/Navbar";
import {Logout} from "./pages/Logout";
import Contact from "./pages/Contact";
import Business from "./pages/Business";
import Services from "./pages/AllServices";
import ServiceDetails from "./component/ServiceDetails"
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {


  return (
    <>
      <BrowserRouter>
      <Navbar/>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Business />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Service/:id" element={<ServiceDetails/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
