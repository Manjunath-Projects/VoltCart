import { assets } from "../assets/assets";
import "../style/ourPolicy.css";

const OurPolicy = () => {
  return (
    <div className="our-policy-container">
      <div className="policy-item">
        <img src={assets.exchange_icon} alt="Exchange Icon" className="policy-icon" />
        <p className="policy-title">Easy Exchange Policy</p>
        <p className="policy-desc">We Offer hassle free exchange policy.</p>
      </div>
      <div className="policy-item">
        <img src={assets.quality_icon} alt="Return Icon" className="policy-icon" />
        <p className="policy-title">7 Days Return Policy</p>
        <p className="policy-desc">We Provide 7 days free return policy.</p>
      </div>
      <div className="policy-item">
        <img src={assets.support_img} alt="Support Icon" className="policy-icon" />
        <p className="policy-title">Best Customer Support</p>
        <p className="policy-desc">We Provide 24/7 customer support.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
