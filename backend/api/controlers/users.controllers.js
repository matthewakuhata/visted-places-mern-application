const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const USERS = [
    {
        id: "u1",
        name: "Max Schwarz",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        places: 3,
    },
];
const getUsers = (req, res, next) => {
    const id = req.params.id;

    res.status(200).json(USERS);
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const user = DUMMY_USERS.find((p) => p.id === id);

    const foundUser = true;
    const passwordValid = true;
    if (!foundUser || !passwordValid) {
        return next(new HttpError("Invalid user name or password", 401));
    }

    res.status(200).json({ message: "logged in!" });
};

const signup = (req, res, next) => {
    const { name, email, password } = req.body;

    const hasUser = false;
    if (hasUser) {
        next(new HttpError("Email already registered", 409));
    }

    const fieldErrors = validationResult(req);
    if (fieldErrors.length) {
        return next(new HttpError(null, 422, fieldErrors));
    }

    const createdUser = {
        id: v4(),
        name,
        email,
        password,
    };

    res.status(201).json(createdUser);
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
