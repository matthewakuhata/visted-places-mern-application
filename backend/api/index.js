const express = require("express");

const placesRouter = require("./routes/places.routes");

const api = express.Router();

api.use("/places", placesRouter);

module.exports = api;
