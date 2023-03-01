import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    username: {type: String},
    comment: {type: String},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null},
    icon: {type: String, default:"defaultavatar.png"},
},{timestamps: true})

export default mongoose.model('Comment', CommentSchema)