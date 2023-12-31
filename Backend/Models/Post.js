const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // comments: {type: Schema.Types.ObjectId, ref: 'Comment'},
    date: { type: Date, default: Date.now},
    tags: [String],
    views: { type: Number, default: 0}
});

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;