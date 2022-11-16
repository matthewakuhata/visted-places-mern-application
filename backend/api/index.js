const express = require("express");

const placesRouter = require("./routes/places.routes");

const api = express.Router();

api.use(placesRouter);

module.exports = api;
