import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
import { assets } from "../assets/assets";
import "../style/about.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="about-section">
        <img
          src={assets.about_img}
          alt="About"
          className="about-image"
        />
        <div className="about-content">
          <p>
            ⚡ Welcome to RajFits Electronics — your trusted destination for cutting-edge gadgets and tech essentials. We are committed to bringing you the latest electronics that blend innovation, quality, and performance. Our online platform is designed to make your tech shopping experience smooth, secure, and satisfying.
          </p>
          <p>
            💻 At RajFits Electronics, we believe technology should empower your everyday life. From the newest smartphones and laptops to smart home devices and accessories, our curated selection features top brands and the most reliable gadgets to meet your needs — whether for work, play, or anything in between.
          </p>
          <strong className="about-subheading">Our Mission</strong>
          <p>
            || Our mission is to keep you connected with technology that elevates your lifestyle. We focus on delivering high-quality products with exceptional service and support. With RajFits Electronics, you can shop with confidence knowing you’re getting the best value, reliable warranties, and a team that’s ready to help whenever you need us.
          </p>
        </div>
      </div>

      <div className="about-why-header">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="about-why-section">
        <div className="why-card">
          <strong>Top-Notch Quality:</strong>
          <p>
            Quality is at the core of our promise. We partner with trusted brands and suppliers to bring you authentic electronics that meet high industry standards.
          </p>
        </div>
        <div className="why-card">
          <strong>Seamless Shopping:</strong>
          <p>
            Our user-friendly website makes finding the right tech easy. Discover new products, compare features, and order with just a few clicks — all from the comfort of your home.
          </p>
        </div>
        <div className="why-card">
          <strong>Reliable Customer Support:</strong>
          <p>
            Our friendly support team is here to answer questions, resolve issues, and ensure you’re satisfied with every purchase. Your feedback helps us keep improving your experience.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
