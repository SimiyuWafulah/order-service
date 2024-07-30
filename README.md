# Order Service
An order management service for handling order creation, updates, retrievals, deletions, and more in a scalable microservices architecture. This service integrates with an existing user service for authentication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Order Management](#order-management)
- [Integration with User Service](#integration-with-user-service)
- [Error Handling](#error-handling)

## Features

- Order Management (CRUD operations)
- Order Status Tracking
- Order Item Details
- Payment Integration
- Data Validation
- Pagination and Sorting
- Notifications and Alerts
- Order History
- Analytics and Reporting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SimiyuWafulah/order-service.git
   cd order-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   ```bash
   mongod --dbpath /path/to/your/db
   ```

4. Start the application:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=3000
MONGODB_URI=mongodb://localhost:27017/orderdb

```

## API Endpoints

### Order Management

All endpoints require a valid JWT token for access. The token should be included in the `Authorization` header of the request in the format `Bearer <token>`.

#### Create Order

- **URL**: `/api/orders`
- **Method**: `POST`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "userId": "UserID",
    "items": [
      {
        "productId": "ProductID",
        "quantity": 2,
        "price": 100.00
      }
    ],
    "total": 200.00,
    "status": "Pending",
    "shippingAddress": "Oginga Odinga Street, Eldoret, Kenya",
    "paymentMethod": "Credit Card"
  }
  ```
- **Responses**:
  - `201 Created`:
    ```json
    {
      "message": "Order created successfully",
      "order": { ... }
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "error": "Validation error message"
    }
    ```

#### Get All Orders

- **URL**: `/api/orders`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
    ```json
    {
      "orders": [ ... ]
    }
    ```

#### Get Order by ID

- **URL**: `/api/orders/:id`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
    ```json
    {
      "order": { ... }
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "message": "Order not found"
    }
    ```

#### Update Order

- **URL**: `/api/orders/:id`
- **Method**: `PUT`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "items": [
      {
        "productId": "UpdatedProductID",
        "quantity": 3,
        "price": 150.00
      }
    ],
    "total": 450.00,
    "status": "Shipped",
    "shippingAddress": " Moi Avenue, Nairobi, Kenya",
    "paymentMethod": "PayPal"
  }
  ```
- **Responses**:
  - `200 OK`:
    ```json
    {
      "message": "Order updated successfully",
      "order": { ... }
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "error": "Validation error message"
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "message": "Order not found"
    }
    ```

#### Delete Order

- **URL**: `/api/orders/:id`
- **Method**: `DELETE`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`:
    ```json
    {
      "message": "Order deleted successfully"
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "message": "Order not found"
    }
    ```

## Integration with User Service

The order service relies on the user service for authentication. Ensure the user service is running and accessible for the order service to authenticate requests. Use the following endpoints from the user service for authentication:

- **Register User**: `/api/users/signup`
- **Authenticate User**: `/api/users/signin`

The order service uses JWT tokens issued by the user service. Include the token in the `Authorization` header as `Bearer <token>` for accessing protected routes.

## Error Handling

Errors are handled using a middleware function. When an error occurs, it is passed to the `next` function, which then sends an appropriate error response.

```javascript
export const errorHandler = (err,req, res,next) => {
    const statusCode = err.statusCode || '500'
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
}
```

