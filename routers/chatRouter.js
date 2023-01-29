const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");
const chatController = require("../controllers/chatController");

const { accessChatContoller, fetchChatsController } = chatController;

router.post("/", requireUser, accessChatContoller);
router.get("/", requireUser, fetchChatsController);

module.exports = router;
