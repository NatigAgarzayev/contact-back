import mongoose, { model, Schema } from "mongoose"

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: String, default: 'Hi there!'},
    followers: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            username: {type: String},
            icon: {type: String},
        }
    ],
    following: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            username: {type: String},
            icon: {type: String},
        }
    ],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    avatar: {type: String, default: "defaultavatar.png"},
    role: {type: String, required: true, default: 'USER'}
},{timestamps: true})

export default mongoose.model('User', UserSchema)