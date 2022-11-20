const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const api = require("./api");
const HttpError = require("./api/models/http-error");

const app = express();

app.use(bodyParser.json());

/**
 *
 */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});
/**
 * API Version 1
 */
app.use("/api/v1/", api);

/**
 * Unknown API routes handling
 */
app.use((req, res, next) => {
    throw new HttpError(`Unkown path ${req.method} ${req.path}`, 404);
});

/**
 * Error Handling
 */
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }

    if (!error.code || !error.message) {
        error = new HttpError(error.message, error.code);
    }

    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code);
    res.json({ message: error.message });
});

mongoose
    .connect(process.env.MONGO_API_CONNECT)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen("5000");
        console.log("Listening on port 5000");
    })
    .catch((error) => {
        console.log(error);
    });
