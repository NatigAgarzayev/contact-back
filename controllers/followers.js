import User from '../models/User.js'


export const doFollow = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const me = await User.findById(req.userId)
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }
        const followerInfo = {
            user: me._id,
            username: me.username,
            icon: me.avatar
        }
        const followingInfo = {
            user: user._id,
            username: user.username,
            icon: user.avatar
        }
        const followers = await User.findByIdAndUpdate(req.params.id, {
            $push: {followers: followerInfo}
        })
        const following = await User.findByIdAndUpdate(req.userId, {
            $push: {following: followingInfo}
        })
        res.json({
            followers, 
            following
        })
    } catch (error) {
        res.json({message: "You can't follow!"})
    }
} 

export const getFollow = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "This user doesnt exist!"})
        }
        const userFollowers = user.followers
        res.json(userFollowers)
    } catch (error) {
        res.json({message: "We can't get followers!"})
    }
}
export const getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "This user doesnt exist!"})
        }
        const userFollowing = user.following
        res.json(userFollowing)
    } catch (error) {
        res.json({message: "We can't get followers!"})
    }
}

export const unFollow = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.json({message: "This user doesn't exist!"})
        }
        await User.findByIdAndUpdate(req.params.id, {
            $pull: {followers: {user: req.userId}}
        })
        await User.findByIdAndUpdate(req.userId, {
            $pull: {following: {user: req.params.id}}
        })
        res.json({message: "You unfollow to this user!"})
    } catch (error) {
        res.json({message: "You can't follow!"})
    }
} 