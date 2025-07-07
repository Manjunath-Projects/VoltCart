import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      bestseller,
    } = req.body;
    const image1 = req.files.image1?.[0] || null;
    const image2 = req.files.image2?.[0] || null;
    const image3 = req.files.image3?.[0] || null;
    const image4 = req.files.image4?.[0] || null;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    console.log("New Product Has Been Added")
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const singleProduct = await productModel.findById(productId);
    res.json({ success: true, singleProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

  const editProduct = async (req, res) => {
  try {
    const { id, name, description, price, bestseller } = req.body;

    // Prepare updated data
    const updateData = {
      name,
      description,
      price: Number(price),
      bestseller: bestseller === "true" || bestseller === true,
    };

    // Check if new images were uploaded
    const image1 = req.files?.image1?.[0] || null;
    const image2 = req.files?.image2?.[0] || null;
    const image3 = req.files?.image3?.[0] || null;
    const image4 = req.files?.image4?.[0] || null;

    const newImages = [image1, image2, image3, image4].filter(Boolean);

    if (newImages.length > 0) {
      const uploadedImages = await Promise.all(
        newImages.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      updateData.image = uploadedImages; // Replace all images with new ones
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (updatedProduct) {
      res.json({
        success: true,
        message: "Product updated successfully.",
        product: updatedProduct,
      });
    } else {
      res.json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



export { addProduct, listProduct, removeProduct, singleProduct,editProduct };
