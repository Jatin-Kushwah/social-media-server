const Chat = require("../models/Chat");
const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

const accessChatContoller = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.send(error(400, "UserId param not sent with request"));
        }

        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name avatar email",
        });

        if (isChat.length > 0) {
            return res.send(success(200, { chat: isChat[0] }));
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req._id, userId],
            };

            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({
                _id: createdChat._id,
            }).populate("users", "-password");
            return res.send(success(200, { chat: fullChat }));
        }
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const fetchChatsController = async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req._id } },
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage");
        const populatedChats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name avatar email",
        });

        return res.send(success(200, { chats: populatedChats }));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = {
    accessChatContoller,
    fetchChatsController,
};
