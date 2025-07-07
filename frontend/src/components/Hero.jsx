import { assets } from "../assets/assets";
import "../style/hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      
      <div className="hero-text-container">
        <div className="hero-text-content">
          <div className="hero-top-row">
            <p className="hero-line"></p>
            <p className="hero-hot-text">Hot Right Now 🔥</p>
          </div>
          <h1 className="hero-heading">
            Fresh Finds Just for You
          </h1>
          <div className="hero-bottom-row">
            <p className="hero-shop-text">Let’s Shop!</p>
            <p className="hero-line"></p>
          </div>
        </div>
      </div>

      <img src={assets.hero_img} alt="Hero" className="hero-image" />
    </div>
  );
};

export default Hero;
