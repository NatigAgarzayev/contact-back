import { sendResetMail } from "../nodemailer.js"
import User from '../models/User.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
export const sendResetLink = async(req, res) => {
    try {
        const {username, email} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }
        if(user.email !== email){
            return res.json({message: "This is not your email!"})
        }
        sendResetMail(user._id, email)
        res.json({message:'Your reset mail was sent!' })
    } catch (error) {
        res.json({message:"We couldn't send reset link via email :_(" })
    }
}

export const resetPassword = async(req, res) => {
    try {
        const {token} = req.params
        const {password} = req.body
        if(!token){
            return res.json({message: "Problem with token!"})
        }
        const getUserIdFromToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = getUserIdFromToken.id
        const user = await User.findById(userId)
        if(!user){
            return res.json({message: "User is not found!"})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        await User.findByIdAndUpdate(userId, {password: hashPassword})
        res.json({message:"Your password is resetted : )"})
    } catch (error) {
        res.json({message:"Token is expired!" })
    }
}