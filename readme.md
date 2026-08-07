# 🛍️ Trendz - E-Commerce Backend API

Trendz is a RESTful backend API built using the MERN stack. It powers an e-commerce application with user authentication, product management, shopping cart, order management, Stripe payment integration, image uploads using Cloudinary, and password recovery using OTP.

This project was built to understand how a real-world e-commerce backend works by implementing authentication, authorization, payment flow, and CRUD operations from scratch.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Role-based Authorization (Admin & Customer)
- Forgot Password using OTP
- Reset Password

---

### Product Management

- Create Product (Admin)
- Update Product (Admin)
- Delete Product (Admin)
- Get All Products
- Get Product By ID
- Product Image Upload using Cloudinary
- Automatic Image Update
- Automatic Image Deletion from Cloudinary

---

### Shopping Cart

- Add products to cart
- Save cart to database
- Retrieve user cart

---

### Orders

- Save successful orders
- View logged-in user's order history
- Payment status tracking
- Order history stored with product snapshot

---

### Payments

- Stripe Checkout Integration
- Secure Checkout Session Creation
- Payment Success & Cancel Handling

---

## 🛠 Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Backend Runtime       |
| Express.js | REST API              |
| MongoDB    | Database              |
| Mongoose   | ODM                   |
| JWT        | Authentication        |
| bcrypt     | Password Hashing      |
| Cloudinary | Image Storage         |
| Multer     | File Upload           |
| Nodemailer | OTP Email Service     |
| Stripe     | Payment Gateway       |
| dotenv     | Environment Variables |

---

Create a `.env` file

```env
PORT=

MONGO_URI=

TOKEN_SECRET=

CLOUD_NAME=
API_KEY=
API_SECRET=

EMAIL_USER=
EMAIL_PASS=

STRIPE_SECRET_KEY=

CLIENT_URL=
```

-
