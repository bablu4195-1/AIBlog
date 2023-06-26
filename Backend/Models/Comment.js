const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {type: String, required :true },
    author: { type: Schema.Types.ObjectId, ref:'User', required: true},
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
    date: { type: Date, default: Date.now},
});


const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;