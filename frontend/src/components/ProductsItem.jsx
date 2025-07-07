import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import "../style/productItem.css"; // Import the CSS file

const ProductsItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="product-item">
      <Link to={`/product/${id}`} className="product-link">
        <div className="product-image-wrapper">
          <img
            src={image[0]}
            alt="product"
            className="product-image"
          />
        </div>
        <p className="product-name">{name}</p>
        <p className="product-price">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductsItem;
