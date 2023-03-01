import { Router } from "express"
import { sendResetLink, resetPassword } from "../controllers/reset.js"
const router = new Router

//send email
//http://localhost:4444/api/reset
router.post('/', sendResetLink)

//reset email
//http://localhost:4444/api/reset/:token
router.post('/:token', resetPassword)

export default router