import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import "../style/placeOrder.css";

const PlaceOrder = () => {
  const [method, setMethod] = useState();
  const [loading, setLoading] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );

    if (emptyFields.length > 0) {
      toast.error("Please fill in all fields before placing the order.");
      return;
    }

    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let url = "";
      if (method === "cod") url = "/api/order/place";
      else if (method === "stripe") url = "/api/order/stripe";
      else if (method === "razorpay") url = "/api/order/razorpay";
      else {
        toast.error("Please select Payment method.");
        setLoading(false);
        return;
      }

      const response = await axios.post(backendUrl + url, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="placeorder">
      <div className="placeorder-left">
        <div className="placeorder-title">
          <Title text1="DELIVERY" text2="INFORMATION" /><span> 🔻</span>
        </div>
        <div className="placeorder-names">
          <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={onChangeHandler} className="placeorder-input" />
          <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={onChangeHandler} className="placeorder-input" />
        </div>
        <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={onChangeHandler} className="placeorder-input" />
        <input type="text" placeholder="Street" name="street" value={formData.street} onChange={onChangeHandler} className="placeorder-input" />
        <div className="placeorder-citystate">
          <input type="text" placeholder="City" name="city" value={formData.city} onChange={onChangeHandler} className="placeorder-input" />
          <input type="text" placeholder="State" name="state" value={formData.state} onChange={onChangeHandler} className="placeorder-input" />
        </div>
        <div className="placeorder-zipcountry">
          <input type="number" placeholder="Zip Code" name="zipCode" value={formData.zipCode} onChange={onChangeHandler} className="placeorder-input" />
          <input type="text" placeholder="Country" name="country" value={formData.country} onChange={onChangeHandler} className="placeorder-input" />
        </div>
        <input type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Phone" value={formData.phone} name="phone" onChange={onChangeHandler} className="placeorder-input" required />
      </div>

      <div className="placeorder-right">
        <div className="placeorder-carttotal">
          <CartTotal />
        </div>
        <div className="placeorder-payment">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="placeorder-methods">
            <div onClick={() => setMethod("stripe")} className={`placeorder-method ${method === "stripe" ? "selected" : ""}`}>
              <span className={`dot ${method === "stripe" ? "selected" : ""}`}></span>
              <img src={assets.upi_logo} className="method-img" alt="Stripe" />
            </div>
            <div onClick={() => setMethod("razorpay")} className={`placeorder-method ${method === "razorpay" ? "selected" : ""}`}>
              <span className={`dot ${method === "razorpay" ? "selected" : ""}`}></span>
              <img src={assets.card_logo} className="method-img" alt="Razorpay" />
            </div>
            <div onClick={() => setMethod("cod")} className={`placeorder-method ${method === "cod" ? "selected" : ""}`}>
              <span className={`dot ${method === "cod" ? "selected" : ""}`}></span>
              <p className="cod-text">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="placeorder-submit">
            <button type="submit" onClick={onSubmitHandler} className="submit-btn">
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
