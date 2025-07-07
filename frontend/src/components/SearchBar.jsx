import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import "../style/searchbar.css"; 

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, searchVisible } =
    useContext(ShopContext);

  return showSearch && searchVisible ? (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search"
          className="search-bar-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="Search Icon" className="search-icon" />
      </div>
    </div>
  ) : null;
};

export default SearchBar;

