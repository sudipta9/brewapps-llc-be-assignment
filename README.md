# Bookstore API

## API Documentation

The Bookstore API allows users to manage books and user accounts. This documentation provides an overview of the available endpoints, their usage, and example request and response messages.

### API Base URL

- Local: `http://localhost:3000/api`

### Set Up and Run the Application Locally

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the following environment variables:

   ```bash
   MONGODB_URI=your-mongodb-connection-string
   SESSION_SECRET=your-session-secret
   PORT=3000
   ```

4. Start the application:

   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`.
Certainly, I'll include information about authentication for each of the API endpoints:

### User Registration

- **Endpoint**: `/user/register`
- **Method**: POST
- **Description**: Register a new user.
- **Authentication**: No authentication required.
- **Request Body**:

   ```json
   {
       "username": "example@example.com",
       "password": "securePassword"
   }
   ```

- **Response**:

   ```json
   {
       "message": "User registered successfully"
   }
   ```

### User Login

- **Endpoint**: `/user/login`
- **Method**: POST
- **Description**: Log in an existing user.
- **Authentication**: No authentication required.
- **Request Body**:

   ```json
   {
       "username": "example@example.com",
       "password": "securePassword"
   }
   ```

- **Response**:

   ```json
   {
       "message": "Login successful",
       "user": {
           "_id": "user-id",
           "username": "example@example.com"
       }
   }
   ```

### Create a Book

- **Endpoint**: `/books`
- **Method**: POST
- **Description**: Create a new book.
- **Authentication**: User must be authenticated.
- **Request Body**:

   ```json
   {
       "title": "Book Title",
       "author": "Author",
       "summary": "Book summary"
   }
   ```

- **Response**:

   ```json
   {
       "message": "Book created successfully"
   }
   ```

### Get All Books

- **Endpoint**: `/books`
- **Method**: GET
- **Description**: Get a list of all books.
- **Authentication**: No authentication required.
- **Response**:

   ```json
   [
       {
           "_id": "book-id-1",
           "title": "Book Title 1",
           "author": "Author 1",
           "summary": "Book summary 1",
           "createdBy": {
               "_id": "user-id-1",
               "username": "example@example.com"
           }
       },
       {
           "_id": "book-id-2",
           "title": "Book Title 2",
           "author": "Author 2",
           "summary": "Book summary 2",
           "createdBy": {
               "_id": "user-id-2",
               "username": "another@example.com"
           }
       }
   ]
   ```

### Get Book by ID

- **Endpoint**: `/books/:bookId`
- **Method**: GET
- **Description**: Get book data by ID.
- **Authentication**: No authentication required.
- **Response**:

   ```json
   {
       "_id": "book-id",
       "title": "Book Title",
       "author": "Author",
       "summary": "Book summary",
       "createdBy": {
           "_id": "user-id",
           "username": "example@example.com"
       }
   }
   ```

### Update Book by ID

- **Endpoint**: `/books/:bookId`
- **Method**: PUT
- **Description**: Update a book by ID.
- **Authentication**: User must be authenticated and must be the owner of the book.
- **Request Body**:

   ```json
   {
       "title": "Updated Book Title",
       "author": "Updated Author",
       "summary": "Updated Book summary"
   }
   ```

- **Response**:

   ```json
   {
       "message": "Book Updated successfully"
   }
   ```

### Delete Book by ID

- **Endpoint**: `/books/:bookId`
- **Method**: DELETE
- **Description**: Delete a book by ID.
- **Authentication**: User must be authenticated and must be the owner of the book.
- **Response**:

   ```json
   {
       "message": "Book deleted successfully"
   }
   ```

### Assumptions and Decisions

- The API assumes that each book is associated with and can modified by the user who created it (createdBy field).

- The API provides user registration and login functionality to manage user accounts.

- The API follows RESTful principles for creating, retrieving, updating, and deleting books.
