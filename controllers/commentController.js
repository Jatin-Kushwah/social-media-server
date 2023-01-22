const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const createCommentController = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const userId = req._id;

        const comment = await Comment.create({
            content,
            user: userId,
            post: postId,
        });

        const post = await Post.findById(postId);
        post.comments.push(comment._id);
        await post.save();

        return res.send(success(201, comment));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = {
    createCommentController,
};
