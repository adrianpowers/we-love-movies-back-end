const theatersRouter = require("express").Router({ mergeParams: true });
const theatersController = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

theatersRouter.route("/")
  .get(theatersController.list)
  .all(methodNotAllowed)
;

module.exports = theatersRouter;