const express = require("express");
const { check } = require("express-validator");

const controller = require("../controlers/users.controllers");

const router = express.Router();

router.get("/", controller.getUsers);

router.get(
    "/signup",
    [
        check("email").normalizeEmail().isEmail(),
        check("name").not().isEmpty(),
        check("password").isLength({ min: 6 }),
    ],
    controller.signup
);

router.get("/login", controller.login);

module.exports = router;
