const express = require("express");
const bodyParser = require("body-parser");

const api = require("./api");
const HttpError = require("./api/models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/v1/", api);

/**
 * Unknown API routes handling
 */
app.use((req, res, next) => {
    throw HttpError("Could not find this route", 404);
});

/**
 * Error Handling
 */
app.use((error, req, res, next) => {
    if (!error.code || !error.message) {
        error = new HttpError(error.message, error.code);
    }

    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code);
    res.json({ message: error.message });
});

app.listen("5000");
