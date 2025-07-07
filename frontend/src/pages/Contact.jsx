import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import "../style/contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="contact-content">
        <img
          src={assets.contact_img}
          alt="Contact Image"
          className="contact-image"
        />
        <div className="contact-details">
          <p className="contact-title">
            Our Store
          </p>
          <p className="contact-text">
            Infocity, Basweshwar Nagar <br />
            Bengaluru - 751024
          </p>
          <p className="contact-text">
            Tel: +91 55555 55555 <br />
            Email: contactus@rajfits.com
          </p>
<button
  className="contact-button"
  onClick={() => window.open("https://www.google.com/maps/@12.9957888,77.5487488,14z/data=!5m1!1e2?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D ")}
>
  Get Location
</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
