import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    username: {type: String},
    title: {type: String, required: true},
    text: {type: String, required: true},
    imageUrl: {type: String, default: ''},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    views: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    edited: {type:Boolean, default: false}
},{timestamps: true})

export default mongoose.model('Post', PostSchema)