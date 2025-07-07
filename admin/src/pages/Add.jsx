import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backEndURL } from "../App";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/add.css";

const Add = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          `${backEndURL}/api/product/single`,
          { productId: id }
        );
        if (response.data.success) {
          const p = response.data.singleProduct;
          setName(p.name || "");
          setDescription(p.description || "");
          setPrice(p.price || "");
          setBestseller(p.bestseller || false);
          if (p.image && p.image[0]) setImage1(p.image[0] || false);
          if (p.image && p.image[1]) setImage2(p.image[1] || false);
          if (p.image && p.image[2]) setImage3(p.image[2] || false);
          if (p.image && p.image[3]) setImage4(p.image[3] || false);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("bestseller", bestseller);

      image1 && typeof image1 !== "string" && formData.append("image1", image1);
      image2 && typeof image2 !== "string" && formData.append("image2", image2);
      image3 && typeof image3 !== "string" && formData.append("image3", image3);
      image4 && typeof image4 !== "string" && formData.append("image4", image4);

      let response;

      if (id) {
        formData.append("id", id);
        response = await axios.post(
          backEndURL + "/api/product/edit",
          formData,
          { headers: { token } }
        );
      } else {
        response = await axios.post(
          backEndURL + "/api/product/add",
          formData,
          { headers: { token } }
        );
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <p>Upload Images</p>
        <div className="image-upload-container">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`}>
              <img
                src={
                  !img
                    ? assets.upload_area
                    : typeof img === "string"
                    ? img
                    : URL.createObjectURL(img)
                }
                className="upload-image"
                alt="upload"
              />
              <input
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][idx];
                  setter(e.target.files[0]);
                }}
                type="file"
                id={`image${idx + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <p>Product Name</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <p>Product Description</p>
        <textarea
          placeholder="Write Content Here..."
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <p>Product Price</p>
        <input
          className="form-input"
          type="number"
          placeholder="25"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>

      <div className="form-group checkbox">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className="submit-button" disabled={loader}>
        {loader
          ? id
            ? "Updating..."
            : "Adding..."
          : id
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
};

export default Add;
