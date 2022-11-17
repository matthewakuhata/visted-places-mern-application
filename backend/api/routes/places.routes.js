const express = require("express");

const HttpError = require("../models/http-error");
const controller = require("../controlers/places.controller");
const router = express.Router();

router.get("/:id", controller.getPlaceById);
router.get("/user/:id", controller.getPlaceByUserId);
router.post("/", controller.createPlace);
router.patch("/:id", controller.updatePlace);
router.delete("/:id", controller.deletePlace);

module.exports = router;
