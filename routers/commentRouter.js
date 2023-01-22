const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");
const commentController = require("../controllers/commentController");

const { createCommentController } = commentController;

router.post("/create", requireUser, createCommentController);

module.exports = router;
