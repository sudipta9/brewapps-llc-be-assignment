// src/controllers/userController.js
const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const CustomError = require("../common/CustomError");
const yup = require("yup");

const usernameSchema = yup.string().email().required();
const passwordSchema = yup.string().min(6).required();

// User registration
const userRegistrationController = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        try {
            await usernameSchema.validate(username);
        } catch (usernameError) {
            throw new CustomError("Please enter a valid email", 400);
        }

        try {
            await passwordSchema.validate(password);
        } catch (passwordError) {
            throw new CustomError(
                "Password must be at least 6 character long",
                400
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            throw new CustomError("Username already exists", 400);
        }

        // Create a new user
        const newUser = new User({
            username,
            password,
        });

        // Hash the password
        newUser.password = newUser.generateHash(password);

        await newUser.save(); // Save the user to the database

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        next(err);
    }
};

// User login
const userLoginController = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return next(new CustomError("Authentication failed", 401));
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    username: user.username,
                },
            });
        });
    })(req, res, next);
};

module.exports = {
    userRegistrationController,
    userLoginController,
};
