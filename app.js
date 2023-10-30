const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config(); // Load environment variables from .env
const app = express();
const passport = require("passport");
require("./config/passport")(passport);
const CustomError = require("./src/common/CustomError");

// Database setup
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        startServer();
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Middlewares
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// routers
const bookRouter = require("./src/routes/books.routes");
const userRouter = require("./src/routes/user.routes");

// API Routes
app.use("/api/books", bookRouter);
app.use("/api/user", userRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof CustomError) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Function to start the server
function startServer() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
