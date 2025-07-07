import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import "../style/cartTotal.css";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
   const amount = getCartAmount();
  return (
    <div className="cart-total-container">
      <div className="cart-total-title">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="cart-total-content">
        <div className="cart-total-row">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <div className="cart-total-row">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="cart-total-row">
          <strong>Total</strong>
          <strong>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </strong>
        </div><hr />
      </div>
    </div>
  );
};

export default CartTotal;
