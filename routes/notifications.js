import { Router } from "express"
import {
    getNotification,
    readNotification
} from '../controllers/notifications.js'
import {checkAuth} from '../utils/checkAuth.js'
const router = new Router

//get not
router.get('/',checkAuth, getNotification)

//read the notification
router.post('/:id', checkAuth, readNotification)

export default router