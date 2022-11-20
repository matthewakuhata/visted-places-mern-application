const jwt = require("jsonwebtoken");

const HttpError = require("../api/models/http-error");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return next(new HttpError("Unable to find token", 401));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.userData = { userId: decodedToken.userId };

        next();
    } catch (err) {
        return next(new HttpError("Authentication failed", 403));
    }
};
