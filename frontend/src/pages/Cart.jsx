import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import "../style/cart.css";
import BestSeller from "../components/BestSeller";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [proceedToPayment, setProceedToPayment] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
      setProceedToPayment(tempData.length > 0);
    }
  }, [cartItems, products]);



  return (
    <div className="cart-container">
      <div className="cart-title">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      

      <div className="cart-items">
           {cartData.length === 0 && (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}


        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
           if (!productData) return null;

          return (
            <div key={index} className="cart-item">
              <div className="item-details">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="item-image"
                />
                <div>
                  <p className="item-name">{productData.name}</p>
                  <div className="item-meta">
                    <p>{currency}{productData.price}</p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                value={item.quantity}
                className="item-qty"
                onChange={(e) =>
                  e.target.value === "" ||  Number(e.target.value) === "0"
                    ? null
                    : updateQuantity(
                      item._id,
                      Number(e.target.value)
                    )
                }
              />

              <img
                src={assets.bin_icon}
                alt="Delete"
                className="delete-icon"
                onClick={() => updateQuantity(item._id, 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="cart-footer">
        <div className="cart-total-wrapper">
          <CartTotal />
          <div className="checkout-btn-wrapper">
            <button
              className="checkout-btn"
              onClick={() =>
                !proceedToPayment
                  ? toast.error("Add Items to cart")
                  : navigate("/place-order")
              }
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
      <div className="missed-collection">
      <Title text1={"COLLECTIONS YOU MAY HAVE"} text2={"MISSED"} />
            <BestSeller />
      </div>
    </div>
  );
};

export default Cart;
