const { v4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Place = require("../models/place");
const User = require("../models/user");
const HttpError = require("../models/http-error");

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

    try {
        const { title, description, coordinates, address, creator } = req.body;

        const user = await User.findById(creator);
        if (!user) {
            return next(new HttpError("User not found!", 404));
        }

        const createdPlace = new Place({
            id: v4(),
            title,
            description,
            image: req.file.path,
            location: {
                // use Google API to get coordinates
                lat: coordinates?.lat || 40.7484405,
                lng: coordinates?.lng || -73.9878584,
            },
            address,
            creator,
        });

        const session = await mongoose.startSession();
        session.startTransaction();

        await createdPlace.save({ session: session });

        user.places.push(createdPlace);
        await user.save({ session: session });

        await session.commitTransaction();
        return res.status(201).json(createdPlace);
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
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
        const foundPlace = await Place.findById(id).populate("creator");

        if (!foundPlace) {
            return next(new HttpError("Could not find place!", 404));
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        foundPlace.creator.places.pull(foundPlace);

        await foundPlace.remove({ session: session });
        await foundPlace.creator.save({ session: session });
        session.commitTransaction();

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
