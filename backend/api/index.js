const express = require("express");
const path = require("path");

const placesRouter = require("./routes/places.routes");
const usersRouter = require("./routes/users.routes");

const api = express.Router();

api.use("/places", placesRouter);
api.use("/users", usersRouter);
api.use("/uploads/images", express.static(path.join("uploads", "images")));

module.exports = api;
