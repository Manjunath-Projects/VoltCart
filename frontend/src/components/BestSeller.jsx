import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import "../style/bestSeller.css"; 

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="bestseller-container">
      <div className="bestseller-header">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="bestseller-description">
          Discover the pinnacle of style with our Best Sellers collection at RajFits. These handpicked pieces are not just fashion statements; they are the embodiment of quality and trendsetting design. Elevate your wardrobe with the most sought-after styles that define contemporary elegance.
        </p>
      </div>
      <div className="bestseller-grid">
        {bestSeller.map((item, index) => (
          <ProductsItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
