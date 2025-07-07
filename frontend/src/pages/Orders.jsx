import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import "../style/orders.css";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="orders-container">
      <div className="orders-title">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-details">
              <img src={item.image[0]} className="order-img" alt="" />
              <div>
                <p className="order-name">{item.name}</p>
                <div className="order-meta">
                  <p>{currency}{item.price}</p>
                  <p>Qty : {item.quantity}</p>
                  <p>Size : {item.size}</p>
                </div>
                <p className="order-date">
                  Date: <span>{new Date(item.date).toDateString()}</span>
                </p>
                <p className="order-payment">
                  Payment: <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="order-status-wrap">
              <div className="order-status">
                <p
                  className={`status-dot ${
                    item.status === "Cancelled"
                      ? "dot-red"
                      : item.status === "Delivered"
                      ? "dot-green"
                      : item.status === "Packing" || item.status === "Order Shipped"
                      ? "dot-blue"
                      : "dot-green"
                  }`}
                ></p>
                <p>{item.status}</p>
              </div>

              <div className="order-payment-type">
                {item.paymentMethod === "COD" ? (
                  <p className="text-red">Cash On Delivery</p>
                ) : (
                  <p className="text-green">Online Payment</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
