# Stationary E-Commerce Backend

This is the backend for a stationary e-commerce platform built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for user authentication, product management, order processing, and more. The backend is designed to support both **user** and **admin** roles, ensuring secure and efficient management of the e-commerce platform.

## Features

- **User Authentication**:

  - User registration and login.
  - JWT-based authentication.
  - Refresh token for secure session management.

- **Product Management**:

  - Admin can create, update, delete, and view products.
  - Users can browse products and view product details.

- **Brand Management**:

  - Admin can create, update, delete, and view brands.

- **Category Management**:

  - Admin can create, update, delete, and view categories.

- **Order Management**:

  - Users can create orders and view their order history.
  - Admin can update order status (e.g., paid, shipped).

- **User Management**:
  - Admin can view all users and block/unblock users.
  - Users can update their profile information.

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB (Database)
  - Mongoose (ODM for MongoDB)
  - JWT (JSON Web Tokens) for authentication
  - Zod for schema validation
  - Cloudinary for image uploads

- **Tools**:
  - Postman (API testing)
  - Git (Version control)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rhrafiulhaque/stationaary-backend.git
   ```
2. Navigate to the project directory:

```bash
cd stationaary-backend
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

- Create a .env file in the root directory.

- Add the following variables:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3. Start the development server:

```bash
npm start
```

# API Routes Documentation

## Authentication Routes

- **POST /api/v1/auth/register**: Register a new user.
- **POST /api/v1/auth/login**: Log in a user.
- **POST /api/v1/auth/refresh-token**: Refresh access token using a refresh token.

## User Routes

- **GET /api/v1/users/get-users**: Get all users (Admin only).
- **GET /api/v1/users/get-me**: Get current user's profile (Admin or User).
- **PATCH /api/v1/users/:userId/block**: Block a user (Admin only).
- **PATCH /api/v1/users/update-user**: Update user profile (Admin or User).

## Product Routes

- **POST /api/v1/products/create-product**: Create a new product (Admin only).
- **GET /api/v1/products/all-products**: Get all products.
- **GET /api/v1/products/:productId**: Get a single product by ID.
- **PATCH /api/v1/products/:productId**: Update a product (Admin only).
- **DELETE /api/v1/products/:productId**: Delete a product (Admin only).

## Brand Routes

- **POST /api/v1/brands/create-brand**: Create a new brand (Admin only).
- **GET /api/v1/brands/all-brands**: Get all brands.
- **GET /api/v1/brands/:brandId**: Get a single brand by ID.
- **PATCH /api/v1/brands/:brandId**: Update a brand (Admin only).
- **DELETE /api/v1/brands/:brandId**: Delete a brand (Admin only).

## Category Routes

- **POST /api/v1/categories/create-category**: Create a new category (Admin only).
- **GET /api/v1/categories/all-categories**: Get all categories.
- **GET /api/v1/categories/:catId**: Get a single category by ID.
- **PATCH /api/v1/categories/:catId**: Update a category (Admin only).
- **DELETE /api/v1/categories/:catId**: Delete a category (Admin only).

## Order Routes

- **POST /api/v1/orders/create-order**: Create a new order (User only).
- **GET /api/v1/orders/verify**: Verify payment status.
- **GET /api/v1/orders/all-orders**: Get all orders (Admin or User).
- **PATCH /api/v1/orders/:orderId**: Update order status (Admin only).

## Live Demo

Check out the live demo of the backend [https://stationaary-backend.vercel.app/](https://stationaary-backend.vercel.app/).
