const express = require("express");
const { check } = require("express-validator");

const controller = require("../controlers/places.controller");

const router = express.Router();

router.get("/:id", controller.getPlaceById);

router.get("/user/:id", controller.getPlacesByUserId);

router.post(
    "/",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty(),
    ],
    controller.createPlace
);

router.patch(
    "/:id",
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    controller.updatePlace
);

router.delete("/:id", controller.deletePlace);

module.exports = router;
