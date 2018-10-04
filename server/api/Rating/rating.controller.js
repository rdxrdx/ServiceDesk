'use strict';

var _ = require('lodash');
var rating = require('./rating.model');

// Get list of category
exports.index = function (req, res) {
    rating.find(function (err, rating) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, rating);
    });
};

// Get a single category
exports.show = function (req, res) {
    rating.findById(req.params.id, function (err, rating) {
        if (err) {
            return handleError(res, err);
        }
        if (!rating) {
            return res.send(404);
        }
        return res.json(rating);
    });
};

// Creates a new category in the DB.
exports.create = function (req, res) {
    rating.create(req.body, function (err, rating) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, rating);
    });
};

// Updates an existing category in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    rating.findById(req.params.id, function (err, rating) {
        if (err) {
            return handleError(res, err);
        }
        if (!rating) {
            return res.send(404);
        }
        var updated = _.merge(rating, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, rating);
        });
    });
};

// Deletes a category from the DB.
exports.destroy = function (req, res) {
    rating.findById(req.params.id, function (err, rating) {

        if (err) {
            return handleError(res, err);
        }

        if (!rating) {
            return res.send(404);
        }

        rating.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}