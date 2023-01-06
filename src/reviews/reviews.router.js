const reviewsRouter = require("express").Router({ mergeParams: true });
const reviewsController = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

reviewsRouter.route("/:reviewId")
  .get(reviewsController.read)
  .put(reviewsController.update)
  .delete(reviewsController.delete)
  .all(methodNotAllowed);

module.exports = reviewsRouter;