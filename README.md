### Live Link: https://book-catallog-backend-pi.vercel.app

### Application Routes:

#### User

- https://book-catallog-backend-pi.vercel.app/api/v1/auth/signup (POST)
- https://book-catallog-backend-pi.vercel.app/api/v1/users (GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/users/0bf3449a-96b8-4a68-944b-e15b4aaccf23 (Single GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/users/0bf3449a-96b8-4a68-944b-e15b4aaccf23 (PATCH)
- https://book-catallog-backend-pi.vercel.app/api/v1/users/ebb6679b-3063-4a58-87be-c4eecc84f93c (DELETE) 
- https://book-catallog-backend-pi.vercel.app/api/v1/profile (GET)

### Category

- https://book-catallog-backend-pi.vercel.app/api/v1/categories/create-category (POST)
- https://book-catallog-backend-pi.vercel.app/api/v1/categories (GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/categories/920ba306-840e-4aa7-9d68-af0f1fd7b995 (Single GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/categories/920ba306-840e-4aa7-9d68-af0f1fd7b995 (PATCH)
- https://book-catallog-backend-pi.vercel.app/api/v1/categories/52ba19c0-179f-4e14-a7a2-2be7263a1772 (DELETE)

### Books

- https://book-catallog-backend-pi.vercel.app/api/v1/books/create-book (POST)
- https://book-catallog-backend-pi.vercel.app/api/v1/books (GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/books/:categoryId/category (GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/books/:id (GET)
- https://book-catallog-backend-pi.vercel.app/api/v1/books/:id (PATCH)
- https://book-catallog-backend-pi.vercel.app/api/v1/books/:id (DELETE)

### Orders

- https://book-catallog-backend-pi.vercel.app/api/v1/orders/create-order (POST)
- https://book-catallog-backend-pi.vercel.app/api/v1/orders (GET) 
- https://book-catallog-backend-pi.vercel.app/api/v1/orders/:orderId (GET)