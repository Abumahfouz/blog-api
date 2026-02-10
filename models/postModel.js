const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});