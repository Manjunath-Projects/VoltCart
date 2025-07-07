import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹ ";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
  let cartData = { ...cartItems };
  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }
  setCartItems(cartData);

  if (token) {
    try {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, quantity: cartData[itemId] },
        { headers: { token } }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
};

  const getCartCount = () => {
  let totalCount = 0;
  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      totalCount += cartItems[itemId];
    }
  }
  return totalCount;
};


  const updateQuantity = async (itemId, quantity) => {
  let cartData = { ...cartItems };
  cartData[itemId] = quantity;
  setCartItems(cartData);

  if (token) {
    try {
      await axios.post(
        backendUrl + "/api/cart/update",
        { itemId, quantity },
        { headers: { token } }
      );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
    }
  }, [location]);

  const getCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    const product = products.find((p) => p._id === itemId);
     if (product && cartItems[itemId] > 0) {
      totalAmount += product.price * cartItems[itemId];
    }
  }
  return totalAmount;
};


  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    setShowSearch,
    showSearch,
    searchVisible,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
