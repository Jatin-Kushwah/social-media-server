const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("comment", commentSchema);
