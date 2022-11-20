const express = require("express");
const { check } = require("express-validator");

const controller = require("../controlers/users.controllers");
const fileUpload = require("../../middleware/file-upload");
const checkAuth = require("../../middleware/check-auth");

const router = express.Router();

router.get("/", controller.getUsers);

/**
 * /users/signup
 */
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

/**
 * /users/login
 */
router.post("/login", controller.login);

/**
 * /users/validate
 */
router.use(checkAuth);
router.post("/validate", (req, res, next) => {
    return res.status(200).json({ message: "Token Validated!" });
});

module.exports = router;
