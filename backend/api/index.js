const express = require("express");

const placesRouter = require("./routes/places.routes");
const usersRouter = require("./routes/users.routes");

const api = express.Router();

api.use("/places", placesRouter);
api.use("/users", usersRouter);

module.exports = api;
