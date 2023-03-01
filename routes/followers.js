import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import {doFollow, getFollow, unFollow, getFollowing} from '../controllers/followers.js'
const router = new Router

//follow to someone
//http://localhost:4444/api/followers/:id
router.post('/:id', checkAuth, doFollow)

//get Followers
//http://localhost:4444/api/followers/:id
router.get('/:id', checkAuth, getFollow)

//get Followers
//http://localhost:4444/api/followers/user/:id
router.get('/user/:id', checkAuth, getFollowing)

//unfollowe
//http://localhost:4444/api/followers/:id
router.delete('/:id', checkAuth, unFollow)

export default router