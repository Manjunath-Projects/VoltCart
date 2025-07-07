import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import "../style/latestCollection.css";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="latest-collection">
      <div className="latest-collection-header">
        <Title text1={"LATEST"} text2={"ACCESSORIES"} />
        <p className="latest-collection-desc">
          Step into the season with RajFits' exhilarating Latest Collection. Designed to redefine your wardrobe, these pieces blend contemporary trends with timeless elegance, offering effortless style for every occasion. Discover your next iconic look.
        </p>
      </div>
      <div className="latest-products-grid">
        {latestProducts.map((item, index) => (
          <ProductsItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            className={index === 0 ? "highlight0" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
