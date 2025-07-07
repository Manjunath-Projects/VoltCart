import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOpen from "./pages/AdminOpen";
import Account from "./pages/Account";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Collection = lazy(() => import("./pages/Collection"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const Product = lazy(() => import("./pages/Product"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Loading = lazy(() => import("./components/Loading"));

const App = () => {
  return (
    <div style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/rajfits25" element={<AdminOpen />} />
          <Route path="*" element={<Loading />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
