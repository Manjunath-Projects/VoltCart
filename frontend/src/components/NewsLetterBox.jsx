import "../style/newsLetter.css";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const NewsLetterBox = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Check login
    if (!token) {
      toast.error("Please log in to subscribe.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        backendUrl + "/api/sendemail",
        { email },
        {
          headers: {
            token, 
          },
        }
      );

      if (res.data.success) {
        toast.success("Subscribed successfully. Check Email for Coupon");
      } else {
        toast.error(res.data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Subscription failed. Try again later.");
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className="newsletter-box">
      <p className="newsletter-title">Subscribe Now to get 20% off</p>
      <p className="newsletter-subtitle">
        Join our newsletter for exclusive offers and updates. Enter your email to receive a 20% discount on your next purchase.
      </p>
      <form className="newsletter-form" onSubmit={onSubmitHandler}>
        <input
          type="email"
          placeholder="Enter Your Valid Email."
          className="newsletter-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="newsletter-button">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
