import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import Navbar from "./component/Navbar";
import { Logout } from "./pages/Logout";
import Contact from "./pages/Contact";
import Business from "./pages/Business";
import AllServices from "./pages/AllServices";
import Favorites from "./pages/Favorites";
import ServiceDetails from "./component/ServiceDetails";
import Profile from "./pages/Profile";
import TermsConditiion from "./pages/TermsConditions";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "./component/Footer";
import { Error } from "./pages/Error";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Business />} />
          <Route path="/business/:id" element={<Business />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Error />} />
          <Route path="/termscondition" element={<TermsConditiion />} />
          <Route path="/Service/:id" element={<ServiceDetails />} />
          <Route path="/favorites/:id" component={ServiceDetails} />

          
        </Routes>
    
      </BrowserRouter>
    </>
  );
};

export default App;
