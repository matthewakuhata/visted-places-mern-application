const multer = require("multer");
const { v4 } = require("uuid");

const MIME_TYPE = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
};

const fileUpload = multer({
    limit: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/images");
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE[file.mimetype];
            cb(null, v4() + "." + ext);
        },
        fileFilter: (req, file, cb) => {
            const isValid = !!MIME_TYPE[file.mimetype];
            const error = isValid ? null : new Error("Invalid mime type!");

            cb(error, isValid);
        },
    }),
});

module.exports = fileUpload;
