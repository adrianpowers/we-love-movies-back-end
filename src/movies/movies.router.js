const moviesRouter = require("express").Router({ mergeParams: true });
const moviesController = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

moviesRouter.route("/").get(moviesController.list).all(methodNotAllowed);
moviesRouter.route("/:movieId").get(moviesController.read).all(methodNotAllowed);
moviesRouter.route("/:movieId/theaters").get(moviesController.movieTheaters).all(methodNotAllowed);
moviesRouter.route("/:movieId/reviews").get(moviesController.movieReviews).all(methodNotAllowed);

module.exports = moviesRouter;