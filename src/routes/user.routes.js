const express = require("express");
const {
    userRegistrationController,
    userLoginController,
} = require("../controllers/userController");
const userRouter = express.Router();

// User Registration
// Endpoint: POST /api/user/register
// Description: Register a new user.
// Authentication: No authentication required.
userRouter.route("/register").post(userRegistrationController);

// User Login
// Endpoint: POST /api/user/login
// Description: Log in an existing user.
// Authentication: No authentication required.
userRouter.route("/login").post(userLoginController);

module.exports = userRouter;
