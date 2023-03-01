import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

//Create post
export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)
        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imageUrl: fileName,
                author: req.userId
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage}
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imageUrl: '',
            author: req.userId,
        })
        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage}
        })

        res.json(newPostWithoutImage)
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//Get All
export const getAll = async (req, res) => {
    try {
        let n = 10;
        const posts = await Post.find().limit(n).sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if(!posts){
            return res.json({message: "There are no questions!"})
        }

        res.json({
            posts,
            popularPosts
        })

    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//Get By Id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1},
        })
        res.json(post) 
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//Get my posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//Get users posts
export const getUsersPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//Delete post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.json({message: "The post doesn't exist!"})
        }
        await User.findByIdAndUpdate(req.userId, {
            $pull: {posts: req.params.id}
        })
        res.json({message: "The post was deleted!"})
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

//get post comments
export const getPostComments = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            })
        )
        res.json(list)
    } catch (error) {
        res.json({message: "Something go wrong!"})
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.json({message: "Post doesn't exist!"})
        }
        const index = post.likes.includes(req.userId)

        if (!index) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => String(id) !== req.userId);
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, post)
        res.json(updatedPost)
    } catch (error) {
        res.json({message: "Couldn't like the post :("})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "User doesn't exist!"})
        }
        const postId = user.posts[user.posts.length - 1]._id + ''
        const post = await Post.findById(postId)
        res.json(post)
    } catch (error) {
        res.json({message: "We can't get user's post"})
    }
}

export const updatePost = async(req, res) => {
    try {
        const {title, text, id} = req.body
        const post = await Post.findById(id)
        if(req.files){
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imageUrl = fileName || ''
        }
        post.title = title
        post.text = text

        await post.save()

        res.json(post)

    } catch (error) {
        res.json({message: "We can't update the post"})
    }
} 