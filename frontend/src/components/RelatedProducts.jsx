import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import "../style/releatedProducts.css"; 

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelataed] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) =>
          item.category === category && item.subCategory === subCategory
      );
      setRelataed(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="related-products">
      <div className="related-products-title">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="related-products-grid">
        {related.map((item, index) => (
          <ProductsItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
