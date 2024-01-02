import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from '../models/User.js'

export const createComment = async (req, res) => {
    try {
        const {postId, comment, parentId, to} = req.body
        const user = await User.findById(req.userId)
        if(!comment){
            res.json({message: "The comment can't be empty!"})
        }

        const newComment = new Comment({
            username: user.username,
            comment,
            parentId,
            icon: user.avatar,
            author: req.userId,
            to
        })
        await newComment.save()
        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })
        } catch (error) {
            console.log(error)
        }
        res.json(newComment)
    } catch (error) {
        res.json({message: "Couldn't create the comment :("})
    }
}

export const removeComment = async (req, res) => {
    try {
        const {id, postId} = req.body
        const comment = await Comment.findByIdAndDelete(id)
        if(!comment){
            return res.json({message: "The comment doesn't exist!"})
        }
        await Post.findByIdAndUpdate(postId, {
            $pull: {comments: id}
        })
        res.json({message: "The comment was deleted!"})
    } catch (error) {
        res.json({message: "Couldn't remove the comment :(!"})
    }
}

export const likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            return res.json({message: "Comment doesn't exist!"})
        }
        const index = comment.likes.includes(req.userId)

        if (!index) {
            comment.likes.push(req.userId);
        } else {
            comment.likes = comment.likes.filter((id) => String(id) !== req.userId);
        }


        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, comment)
        res.json(updatedComment)
    } catch (error) {
        res.json({message: "Couldn't like the comment :("})
    }
}

export const editComment = async (req, res) => {
    try {
        const {id, text} = req.body
        const comment = await Comment.findById(id)
        if(!comment){
            return res.json({message: "This comment doesn't exist!"})
        }
        await Comment.findByIdAndUpdate(id, {
            comment: text,
            edited: true
        })
        res.json({message: "The comment is edited"})
    } catch (error) {
        res.json({message: "Couldn't edit the comment"})
    }
}