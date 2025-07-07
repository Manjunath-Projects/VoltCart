import React, { useState } from "react";
import axios from "axios";
import { backEndURL } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import "../styles/login.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backEndURL + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="brand-logo">
          <img src={assets.logo} alt="brand logo" />
        </div>
        <h1 className="login-title">Admin Panel</h1>
        <p className="login-subtext">
          Please enter your <b>email</b> and <b>password</b> to access the <br />
          <center><b>admin panel.</b></center>
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="login-field">
            <p className="login-label">Email Address:</p>
            <input
              className="login-input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Admin Email"
              required
            />
          </div>

          <div className="login-field relative">
            <p className="login-label">Password:</p>
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🐵" : "🙈"}
            </button>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
