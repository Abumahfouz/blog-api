const Comment = require('../models/Comment');
const Post = require('../models/Post');

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = async(req, res) => {
    const { postId, content } = req.body;
    const userID = req.user._id;
    
    if (!userID) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const referencedPost = await Post.findById(postId);
    if (!postId) {
        return res.status(400).json({ message: "Referenced post is required" });
    }
    if (!referencedPost) {
        return res.status(404).json({ message: "Referenced post not found" });
    }
    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }
    try {
        const comment = await Comment.create({
            content,
            author: req.user._id,
            post: postId,
        });
        res.status(201).json({ message: "Comment created successfully", comment });
    } catch (error) {
        return res.status(500).json({ message: "Error creating comment", error });
    }
}


module.exports = {
    createComment,
}