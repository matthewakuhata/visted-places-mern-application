const { v4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u2",
    },
];

const getPlaceById = (req, res, next) => {
    const id = req.params.id;
    const place = DUMMY_PLACES.find((p) => p.id === id);

    if (!place) {
        return next(
            new HttpError("Could not find a place for the given place id!", 404)
        );
    }

    return res.status(200).json({ ...place });
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.id;
    const places = DUMMY_PLACES.filter((p) => p.creator === userId);

    if (!places) {
        return next(
            new HttpError("Could not find a place for the given user id!", 404)
        );
    }

    return res.status(200).json(places);
};

const createPlace = (req, res, next) => {
    const { errors: fieldErrors } = validationResult(req);
    if (fieldErrors.length) {
        return next(new HttpError(null, 422, fieldErrors));
    }

    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: v4(),
        title,
        description,
        location: {
            // use Google API to get coordinates
            lat: 40.7484405,
            lng: -73.9878584,
        },
        address,
        creator,
    };

    return res.status(201).json(createdPlace);
};

const updatePlace = (req, res, next) => {
    const fieldErrors = validationResult(req);
    if (fieldErrors.length) {
        return next(new HttpError(null, 422, fieldErrors));
    }

    const id = req.params.id;
    const foundPlace = { ...DUMMY_PLACES.find((p) => p.id === id) };
    if (!foundPlace) {
        return next(
            new HttpError("Could not find a place for the given user id!", 404)
        );
    }

    const { title, description } = req.body;
    const updatedPlace = {
        title,
        description,
        ...foundPlace,
    };

    return res.status(200).json(updatedPlace);
};

const deletePlace = (req, res, next) => {
    const id = req.params.id;

    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== id);

    return res.status(200).json({ message: "Place deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
