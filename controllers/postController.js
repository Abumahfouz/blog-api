const Post = require('../models/Post');

// @desc  create a new post
// @route POST /api/posts
// @access Private
const createPost = async(req, res) => {
    const { title, content, tags } = req.body;
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
            tags,
            author: req.user._id,
        });
        res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ message: "Error creating post", error });
    }
}

// @desc  get all posts
// @route GET /api/posts
// @access Public
const getPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username', );
        res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching posts", error });
    }
}


// @desc  update a post
// @route PUT /api/posts/:id
// @access Private (only the author or admin can update)
const updatePost = async(req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userID = req.user._id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== userID && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content, tags }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: "Error updating post", error });
    }
}

// @desc delete a post
// @route DELETE /api/posts/:id
// @access Private (only the author or admin can delete)

const deletePost = async(req, res) => {
    const { id } = req.params;
    const userID = req.user._id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author.toString() !== userID && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting post", error });
    }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}