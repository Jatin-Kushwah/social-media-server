const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat",
            required: true,
        },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("message", messageSchema);
