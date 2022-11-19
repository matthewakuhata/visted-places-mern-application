const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, "-password");
        const mappedUsers = users.map((user) =>
            user.toObject({ getters: true })
        );
        res.status(200).json(mappedUsers);
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        const passwordValid = password === user?.password;
        if (!user || !passwordValid) {
            return next(new HttpError("Invalid username or password", 401));
        }

        res.status(200).json({ message: "logged in!", id: user.id });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const signup = async (req, res, next) => {
    console.log("here");
    const { name, email, password, image } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return next(
                new HttpError("Email already registered. Please login", 422)
            );
        }

        const fieldErrors = validationResult(req);
        if (fieldErrors.length) {
            return next(new HttpError(null, 422, fieldErrors));
        }

        const createdUser = new User({
            name,
            email,
            password,
            image: "123",
            places: [],
        });

        await createdUser.save();
        res.status(201).json(createdUser.toObject({ getters: true }));
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
