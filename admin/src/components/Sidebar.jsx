import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-links">
        <NavLink to="/add" className="sidebar-link">
          <img src={assets.add_icon} className="sidebar-icon" alt="Add Icon" />
          <p className="sidebar-text">Add Items</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-link">
          <img src={assets.order_icon} className="sidebar-icon" alt="List Icon" />
          <p className="sidebar-text">List Items</p>
        </NavLink>

        <NavLink to="/orders" className="sidebar-link">
          <img src={assets.parcel_icon} className="sidebar-icon" alt="Orders Icon" />
          <p className="sidebar-text">Orders Items</p>
        </NavLink>

         <NavLink to="/subscribers" className="sidebar-link">
          <img src={assets.gmail} className="sidebar-icon" alt="mail Icon" />
          <p className="sidebar-text">Subscribers</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
