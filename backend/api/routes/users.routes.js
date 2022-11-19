const express = require("express");
const { check } = require("express-validator");

const controller = require("../controlers/users.controllers");
const fileUpload = require("../../middleware/file-upload");

const router = express.Router();

router.get("/", controller.getUsers);

router.post(
    "/signup",
    fileUpload.single("image"),
    [
        check("email").normalizeEmail().isEmail(),
        check("name").not().isEmpty(),
        check("password").isLength({ min: 6 }),
    ],
    controller.signup
);

router.post("/login", controller.login);

module.exports = router;
