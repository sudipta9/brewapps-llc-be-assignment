const express = require("express");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const {
    getAllBooksController,
    createBookController,
    getBookByIdController,
    deleteBookByIdController,
    updateBookByIdController,
} = require("../controllers/bookController");

const bookRouter = express.Router();

bookRouter
    .route("/")
    // Get All Books
    // Endpoint: GET /api/books
    // Description: Get a list of all books.
    // Authentication: No authentication required.
    .get(getAllBooksController)

    // Create a Book
    // Endpoint: POST /api/books
    // Description: Create a new book.
    // Authentication: User must be authenticated.
    .post(ensureAuthenticated, createBookController);

bookRouter
    .route("/:bookId")
    // Get Book by ID
    // Endpoint: GET /api/books/:bookId
    // Description: Get book data by ID.
    // Authentication: No authentication required.
    .get(getBookByIdController)

    // Update Book by ID
    // Endpoint: PUT /api/books/:bookId
    // Description: Update a book by ID.
    // Authentication: User must be authenticated and must be the owner of the book.
    .put(ensureAuthenticated, updateBookByIdController)

    // Delete Book by ID
    // Endpoint: DELETE /api/books/:bookId
    // Description: Delete a book by ID.
    // Authentication: User must be authenticated and must be the owner of the book.
    .delete(ensureAuthenticated, deleteBookByIdController);

module.exports = bookRouter;
