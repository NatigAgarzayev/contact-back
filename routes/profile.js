import { Router } from "express"
import { checkAuth } from "../utils/checkAuth.js"
import { getUserById, changeAvatar, getAvatar, resetAvatar, changeStatus, getStatus } from "../controllers/profile.js"
const router = new Router() 

//get user by id
router.get('/:id', getUserById)

//change user avatar
router.post('/avatar/', checkAuth, changeAvatar)

//get user avatar
router.get('/avatar/:id', getAvatar)

//reset user avatar
router.post('/avatar/:id', checkAuth, resetAvatar)

//post user status
router.post('/status/:id', checkAuth,  changeStatus)
//post user status
router.get('/status/:id', checkAuth,  getStatus)
export default router