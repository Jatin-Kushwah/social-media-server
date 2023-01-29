const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            required: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("chat", chatSchema);
