import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/account.css";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Account = () => {
    const navigate = useNavigate();
    const { getCartCount, getCartAmount, backendUrl, setCartItems, setToken } = useContext(ShopContext);
    const [user, setUser] = useState({ name: "", email: "" });

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
        setCartItems({});
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(backendUrl + "/api/user/me", {
                    headers: {
                        token: localStorage.getItem("token"),
                    },

                });
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (err) {
                console.error("Error fetching user data", err);
            }
        };
        fetchUser();

    }, []);

    return (
        <div className="account-wrapper">
            <h1 className="account-title">
                <img src={assets.profile_icon} alt="" width="35px" /> My Account</h1>
            <div className="account-card">
                <div className="account-row">
                    <label className="account-label">Username:</label>
                    <span className="account-value">{user.name}</span>
                </div>
                <div className="account-row">
                    <label className="account-label">Email:</label>
                    <span className="account-value">{user.email}</span>
                </div>
                <div className="account-row">
                    <p>You have <strong>{getCartCount()}</strong> items in your cart.</p>
                </div>
                <div className="account-row">
                    <p>Cart Amount: <strong>₹{getCartAmount()}</strong></p>
                </div>
                <div className="account-buttons">
                    <button className="account-btn primary" onClick={() => navigate("/cart")}>
                        Go to Cart
                    </button>
                    <button className="account-btn" onClick={() => navigate("/orders")}>
                        View Orders
                    </button>
                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </div >
    )

};

export default Account;
