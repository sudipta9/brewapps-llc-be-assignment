// src/controllers/bookController.js

const Book = require("../models/Book");
const CustomError = require("../common/CustomError");
const mongoose = require("mongoose");
// Get a list of all books
const getAllBooksController = async (req, res, next) => {
    try {
        const books = await Book.find().populate("createdBy", "-password");
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

// Create a book
const createBookController = async (req, res, next) => {
    try {
        const { title, author, summary } = req.body;

        if (!title || !author || !summary) {
            throw new CustomError(
                "Title, author, and summary are required",
                400
            );
        }

        // Create a new book
        const book = new Book({
            title,
            author,
            summary,
            createdBy: req.user.id,
        });

        await book.save();
        res.status(201).json({ message: "Book created successfully" });
    } catch (err) {
        next(err);
    }
};
// Get book data by ID
const getBookByIdController = async (req, res, next) => {
    try {
        const isValidId = mongoose.isValidObjectId(req.params.bookId);
        if (!isValidId) throw new CustomError("Book not found", 404);
        const book = await Book.findById(req.params.bookId).populate(
            "createdBy",
            "-password"
        );

        if (!book) {
            throw new CustomError("Book not found", 404);
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

// update a book by ID
const updateBookByIdController = async (req, res, next) => {
    try {
        const { title, author, summary } = req.body;
        const isValidId = mongoose.isValidObjectId(req.params.bookId);
        if (!isValidId) throw new CustomError("Book not found", 404);
        const book = await Book.findById(req.params.bookId);

        if (!book) {
            throw new CustomError("Book not found", 404);
        }

        if (book.createdBy.toString() !== req.user.id) {
            throw new CustomError("Unauthorized to update this book", 403);
        }

        book.title = title || book.title;
        book.author = author || book.author;
        book.summary = summary || book.summary;

        await book.save();

        res.status(200).json({ message: "Book Updated successfully" });
    } catch (err) {
        next(err);
    }
};

// Delete a book by ID
const deleteBookByIdController = async (req, res, next) => {
    try {
        const isValidId = mongoose.isValidObjectId(req.params.bookId);
        if (!isValidId) throw new CustomError("Book not found", 404);

        const book = await Book.findById(req.params.bookId);

        if (!book) {
            throw new CustomError("Book not found", 404);
        }

        if (book.createdBy.toString() !== req.user.id) {
            throw new CustomError("Unauthorized to delete this book", 403);
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBooksController,
    createBookController,
    getBookByIdController,
    updateBookByIdController,
    deleteBookByIdController,
};
