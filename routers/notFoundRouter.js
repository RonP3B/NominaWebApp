const express = require("express");
const notFoundController = require("../controllers/notFoundController");

const notFoundRouter = express.Router();

notFoundRouter.get("*", notFoundController.getNotFound);

module.exports = notFoundRouter;
