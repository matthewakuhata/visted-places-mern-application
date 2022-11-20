const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
        if (!user) {
            return next(new HttpError("Invalid username or password", 403));
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return next(new HttpError("Invalid username or password", 403));
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ userId: user.id, token });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

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

        const hashedPassword = await bcrypt.hash(password, 12);
        const createdUser = new User({
            name,
            email,
            password: hashedPassword,
            image: req.file?.path || " ",
            places: [],
        });

        await createdUser.save();

        const token = jwt.sign(
            {
                userId: createdUser.id,
                email: createdUser.email,
            },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ userId: createdUser.id, token });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
