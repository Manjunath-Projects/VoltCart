import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndURL, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import "../styles/orders.css";
import { Link, Navigate } from "react-router-dom";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backEndURL + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backEndURL + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h3 className="orders-title">Order Page</h3>
      <div className="orders-list">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <img src={assets.parcel_icon} alt="parcel" className="order-icon" />
            <div className="order-details">
              <div className="order-items">
                {order.items.map((item, index) => (
                  <p className="order-item" key={index}>
                    {item.name} X {item.quantity} <span>{item.size}{index < order.items.length - 1 ? ',' : ''}</span>
                  </p>
                ))}
              </div>
              <p className="order-user">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}
                </p>
              </div>
              <p className="order-phone">{order.address.phone}</p>
            </div>
            <div className="order-meta">
              <p>Items: {order.items.length}</p>
              <p className="order-method">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="order-amount"><center>
              <p>Total Amount</p><br />
              {currency}
              {order.amount}</center>
            </p>
            <select
              className="order-status"
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Order Shipped">Order Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
