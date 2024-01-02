import User from '../models/User.js'
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Notification from '../models/Notification.js'
export const adminAuth = async(req, res) => {
    try {
        const {username, password} = req.body 
        const admin = await User.findOne({username})
        if(!admin){
            return res.json({message: "User doesn't exist!"})
        }
        if(admin.role !== 'ADMIN'){
            return res.json({message: "This user is NOT admin!!"})
        }

        const isPassCorrect = await bcrypt.compare(password, admin.password)

        if(!isPassCorrect){
            return res.json({message: "The passwor is not correct!!"})
        }

        const token = jwt.sign(
            {
                id: admin._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({
            token,
            admin,
            message: "You are logged in as ADMIN!"
        })

    } catch (error) {
        res.json({message: "Admin login error!"})
    }
}

export const getAdmin = async(req, res) => {
    try {
        const admin = await User.findById(req.adminId)
        if(!admin){
            return res.json({message: "This user doesn't exist!"})
        }

        const token = jwt.sign(
            {
                id: admin._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({
            admin,
            token
        })

    } catch (error) {
        res.json({message: "Error getting ADMIN!"})
    }
}

export const getStat = async(req, res) => {
    try {
        const user = await User.find()
        const comment = await Comment.find()
        const post = await Post.find()
        res.json({
            user,
            comment,
            post
        })
    } catch (error) {
        res.json({message: "User error"})
    }
}

export const deleteUser =async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.json({message: "This user doesn't exist!"})
        }
        await User.findByIdAndDelete(req.params.id)
        res.json({
            user,
            message: `You deleted ${user?.username}`
        })
    } catch (error) {
        res.json({message: "Problem with delete user!"})
    }
}

export const changeRole = async(req, res) => {
    try {
        const {id, role} = req.body

        await User.findByIdAndUpdate(id, {
            role: role
        })
        const user = await User.find()
        res.json({
            user,
            message: `You change the role to ${role}!`
        })
    } catch (error) {
        res.json({message: "Problem with cahnge role!"})
    }
}

export const changeStatus = async(req, res) => {
    try {
        const {id, status} = req.body
        await User.findByIdAndUpdate(id, {
            status: status
        })
        const user = await User.find()
        res.json({
            user,
            message: "You change the status!"
        })
    } catch (error) {
        res.json({message: "Problem with cahnge status!"})
    }
}

export const createNotification = async(req, res) => {
    try {
        const {title, text} = req.body
        const newNotification = new Notification({
            title,
            text
        })
        await newNotification.save()
        res.json(newNotification)
    } catch (error) {
        res.json({message: "Problem with create notification!"})
    }
}

export const deletePost = async (req, res) => {
    try {
        const {postid, userid} = req.body
        const post = await Post.findById(postid)
        if(!post) {
            return res.json({message: "This post doesn't exist!"})
        }
        await User.findByIdAndUpdate(userid, {
            $pull: {posts: postid}
        })
        await Post.findByIdAndDelete(postid)
        res.json({
            post,
            message: `You deleted ${post?.username}'s post`
        })
    } catch (error) {
        res.json({message: "Problem with delete notification!"})
    }
}
