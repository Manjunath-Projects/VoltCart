import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import "../styles/navbar.css";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <img src={assets.logo} alt="Logo" className="navbar-logo" />
      <button onClick={handleClick} className="navbar-logout-button">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
