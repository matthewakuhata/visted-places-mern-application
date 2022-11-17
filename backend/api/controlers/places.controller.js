const { v4 } = require("uuid");
const { validationResult } = require("express-validator");

const Place = require("../models/place");
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

const getPlaceById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const place = await Place.findById(id);

        if (!place) {
            return next(
                new HttpError(
                    "Could not find a place for the given place id!",
                    404
                )
            );
        }

        return res.status(200).json(place.toObject({ getters: true }));
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const places = await Place.find({ creator: userId });

        if (!places.length) {
            return next(
                new HttpError(
                    "Could not find a place for the given user id!",
                    404
                )
            );
        }

        const mappedPlaces = places.map((place) =>
            place.toObject({ getters: true })
        );
        return res.status(200).json(mappedPlaces);
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const createPlace = async (req, res, next) => {
    const { errors: fieldErrors } = validationResult(req);
    if (fieldErrors.length) {
        return next(new HttpError(null, 422, fieldErrors));
    }

    const { title, description, coordinates, address, creator, image } =
        req.body;

    const createdPlace = new Place({
        id: v4(),
        title,
        description,
        image,
        location: {
            // use Google API to get coordinates
            lat: coordinates.lat || 40.7484405,
            lng: coordinates.lng || -73.9878584,
        },
        address,
        creator,
    });

    try {
        await createdPlace.save();
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }

    return res.status(201).json(createdPlace);
};

const updatePlace = async (req, res, next) => {
    const fieldErrors = validationResult(req);
    if (fieldErrors.length) {
        return next(new HttpError(null, 422, fieldErrors));
    }

    const id = req.params.id;
    try {
        const foundPlace = await Place.findById(id);
        if (!foundPlace) {
            return next(
                new HttpError(
                    "Could not find a place for the given user id!",
                    404
                )
            );
        }

        const { title, description } = req.body;
        foundPlace.title = title;
        foundPlace.description = description;

        await foundPlace.save();
        return res.status(200).json(foundPlace.toObject({ getters: true }));
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const deletePlace = async (req, res, next) => {
    const id = req.params.id;

    try {
        const foundPlace = await Place.findById(id);
        await foundPlace.remove();

        return res.status(200).json({ message: "Place deleted" });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
