import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Social from "../components/Social.jsx";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    <div className="absolute w-screen overflow-hidden bg-dark">
      <Navbar />
      <Outlet />
      <Social />
      <Footer />
    </div>
  );
};

export default Layout;
