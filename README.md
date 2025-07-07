# 👕 RajFits Cloth Store

RajFits Cloth Store is a full-featured **e-commerce web application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project includes a customer-facing online store as well as an admin dashboard for managing products, orders, and subscribers.

> It offers real-time order tracking, email-based coupon systems, secure login, and a seamless shopping experience across categories like Men, Women, and Kids.

---

## 🌟 Features

### 🛍️ User Side

- Browse & filter clothes by category, subcategory, and size
- Add to cart with selected sizes
- Account-based authentication (JWT)
- Create account, login, and personalized cart/orders
- Forgot password support via Contact page
- Checkout with:
  - Address form
  - Payment method selection (Card, UPI, Cash on Delivery)
- Order confirmation with live tracking status
- Email subscription with coupon code & redeem link (via Nodemailer)
- Mobile responsive design

---

### 📄 Pages

1. **Home** – Store intro and promotions  
2. **Collections** – Filter and search products  
3. **Contact** – Store location and support  
4. **About** – Brand story   
5. **Cart Page** – View & update cart, add quantities  
6. **Account Page** – Profile, login/logout, and orders  
7. **Orders (inside Account)** –  
   - Product summary  
   - Quantity & total  
   - Payment method  
   - Live order status updates  
8. **Login/Register (inside Account)**  
9. **Checkout Page** –  
   - Fill address  
   - Choose payment  
   - Place order  
10. **Footer** – Contact info, brand logo, quick links

---

## 🔐 Authentication

- JWT-based login system
- Passwords are hashed using bcrypt
- Auth-protected routes for cart, orders, and admin
- Each user's cart & orders are stored securely under their account

---

## ✉️ Email Subscription (Nodemailer)

- Subscribe to the store’s newsletter
- Receives a welcome email with:
  - Coupon Code
  - "Redeem Now" button that links to the store

---


## 📦 Admin Panel

A secure dashboard for store administrators.
## 🔐 Admin Panel Access

The admin panel is available at the following route:

in home page of user website in search bar  **/admin/rajfits25**

### 1. Add Items
- Upload 4 product images
- Product details: name, description, price, available sizes
- Category: Men / Women / Kids
- Subcategory: Top Wear / Bottom Wear / Winter Wear
- Toggle to mark as "Best Seller"
- Add button to save in database

### 2. Manage Products
- View all products in list format
- Includes:
  - Image, name, category, price
  - Delete button to remove products

### 3. Manage Orders
- View all user orders
- Details include:
  - Items ordered
  - Quantity
  - Payment method
  - Total price
  - Address
  - Order date
- Update order status:
  - Order Placed
  - Packing
  - Shipped
  - Out for Delivery
  - Delivered
  - Cancelled

### 4. Subscribers List
- View all subscribed user emails
- Search bar to filter through list

---

## 🧰 Tech Stack

**Frontend:**
- React.js
- React Router (for page routing)
- Styled CSS 

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB
- Mongoose

**Authentication:**
- JSON Web Tokens (JWT) for session management
- bcrypt for password hashing and security

**Email Service:**
- Nodemailer (used to send coupon/subscription emails)

**Image/File Upload :**
- Cloudinary

## ⚠️ Important Note

This application is currently **optimized for desktop use**. While it may load on mobile devices, certain features and layouts are not fully responsive or tested for smaller screen sizes.


