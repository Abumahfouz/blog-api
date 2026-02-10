const Post = require('../models/Post');

// @desc  create a new post
// @route POST /api/posts
// @access Private
const createPost = async(req, res) => {
    const { title, content } = req.body;
    const userID = req.user._id;
    if (!userID) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!title || !content) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const post = await Post.create({
            title,
            content,
            author: req.user._id,
        });
        res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ message: "Error creating post", error });
    }
}

module.exports = {
    createPost,
}