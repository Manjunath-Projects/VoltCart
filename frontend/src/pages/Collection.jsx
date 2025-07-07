import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductsItem from "../components/ProductsItem";
import '../style/collection.css';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSize = (e) => {
    const value = e.target.value;
    sortSize((prev) =>     
    prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    )
  }

  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.size)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    const sorted = [...filterProducts];
    switch (sortType) {
      case "low-high":
        setFilterProducts(sorted.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(sorted.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="collection-container">
      {/* Filter Sidebar */}
      <div className="collection-filters">
        {/* <p className="filter-header" onClick={() => setShowFilter(!showFilter)}>
          FILTERS{" "}
          <img
            src={assets.dropdown_icon}
            className={`filter-dropdown-icon ${showFilter ? "rotate" : ""}`}
            alt=""
          />
        </p> */}

        <div className={`filter-box ${showFilter ? "" : "hidden"}`}>
          <p className="filter-title">CATEGORIES</p>
          <div className="filter-options">
            {["Men", "Women", "Kids", "Multi Color", "White", "Black"].map((cat) => (
              <label key={cat}>
                <input type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
              </label>
            ))}
          </div>
        </div>

        <div className={`filter-box ${showFilter ? "" : "hidden"}`}>
          <p className="filter-title">TYPE</p>
          <div className="filter-options">
            {["Top Wear", "Bottom Wear", "Winter Wear", "Summer Wear", "Stylish", "Formals"].map((sub) => (
              <label key={sub}>
                <input type="checkbox" value={sub} onChange={toggleSubCategory} /> {sub}
              </label>
            ))}
          </div>
        </div>

        <div className={`filter-box ${showFilter ? "" : "hidden"}`}>
          <p className="filter-title">AVAILABILITY</p>
          <div className="filter-options">
            {["Exclude Out of Stock"].map((sub) => (
              <label key={sub}>
                <input type="checkbox" value={sub}  /> {sub}
              </label>
            ))}
          </div>
        </div>

        <div className={`filter-box ${showFilter ? "" : "hidden"}`}>
          <p className="filter-title">SIZE</p>
          <div className="filter-options">
            {["S", "M", "L", "XL", "XXL"].map((sub) => (
              <label key={sub}>
                <input type="checkbox" value={sub} onChange={toggleSize} /> {sub}
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="collection-products">
        <div className="collection-header">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="sort-dropdown"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevent">Sort by: Popularity </option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
            <option value="New Designs">New Designs</option>
          </select>
        </div>

        <div className="product-grid">
          {filterProducts.map((item, index) => (
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
    </div>
  );
};

export default Collection;