const express = require("express");
const { check } = require("express-validator");

const controller = require("../controlers/users.controllers");

const router = express.Router();

router.get("/", controller.getUsers);

router.post(
    "/signup",
    [
        check("email").normalizeEmail().isEmail(),
        check("name").not().isEmpty(),
        check("password").isLength({ min: 6 }),
    ],
    controller.signup
);

router.post("/login", controller.login);

module.exports = router;
