# Blog Project

## Overview

The Blog Project is a backend system designed for a blogging platform. Users can write, update, and delete their blogs, while Admins have special permissions for user and blog management. The system incorporates secure authentication, role-based access control, and public APIs for viewing blogs with search, sort, and filter functionalities.

---

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

---

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rhrafiulhaque/blog-backend
   cd blog-backend

   ```

2. **Install The Dependencies**:

   ```bash
   npm install
   npm run dev
   ```

   This will start the server on the specified port (default: 5000).

3. **Set up your environment**: Create a `.env` file in the root directory for environment variables. For example, you might need to specify a MongoDB connection string:

   ```bash
   MONGO_URI="your_mongodb_connection_string"

   ```

### **Check the API**:

Once the server is running, you can access the live API and see it in action by visiting: [Blog Project Backend API](https://blog-projeect.vercel.app/)

## Features

### User Roles

#### Admin:

- Created manually in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating the `isBlocked` property.
- **Cannot update any blog.**

#### User:

- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.
- **Cannot perform admin actions.**

### Authentication & Authorization

#### Authentication:

- Users must log in to perform write, update, and delete operations.

#### Authorization:

- Admin and User roles are differentiated and secured.

### Blog API

- A public API for reading blogs:
  - Includes blog title, content, author details, and other necessary information.
  - Supports **search**, **sorting**, and **filtering** functionalities.

---

## Models

### User Model

```javascript
{
  name: string,
  email: string,
  password: string,
  role: "admin" | "user", // Default is "user"
  isBlocked: boolean, // Default is false
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model

```javascript
{
  title: string,
  content: string,
  author: ObjectId, // Reference to User model
  isPublished: boolean, // Default is true
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### 1. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

- **Success (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

- **Failure (400):**

```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

#### 1.2 Login User

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

- **Failure (401):**

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

---

### 2. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Request Header:**
`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

- **Success (201):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Request Header:**
`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

**Request Header:**
`Authorization: Bearer <token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Query Parameters:**

- `search`: Search blogs by title or content.
- `sortBy`: Sort blogs by specific fields (e.g., `createdAt`, `title`).
- `sortOrder`: Sorting order (`asc` or `desc`).
- `filter`: Filter blogs by author ID.

**Example:**

```plaintext
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
```

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

---

### 3. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

**Request Header:**
`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Request Header:**
`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```
