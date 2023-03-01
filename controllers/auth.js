import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//Register
export const register = async(req, res) => {
    try {
        const {username, email, password} = req.body
        const isUsed = await User.findOne({username})
        const isUsedEmail = await User.findOne({email})
        if(isUsed){
            return res.json({message: "This user is exist!"})
        }
        if(isUsedEmail){
            return res.json({message: "This email is using!"})
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        // const token = jwt.sign(
        //     {
        //         id: newUser._id
        //     }, 
        //     process.env.JWT_SECRET,
        //     {expiresIn: '30d'}
        // )

        await newUser.save()

        res.json({
            newUser,
            // token,
            message: "Registration was successfull!"
        })
    } catch (error) {
        res.json({message: "Error during create user!"})
    }
}
export const login = async(req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.json({message: "The password is not correct!"})
        }

        const token = jwt.sign(
            {
                id: user._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            token,
            user,
            message: "You are logged in!"
        })

    } catch (error) {
        res.json({message: "Error during login user!"})
    }
}
export const getMe = async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }

        const token = jwt.sign(
            {
                id: user._id
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            user,
            token
        })

    } catch (error) {
        res.json({message: "Error getting user data!"})
    }
}