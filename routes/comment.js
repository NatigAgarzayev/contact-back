import {Router} from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createComment, removeComment, likeComment } from '../controllers/comment.js'
const router = new Router()

//Create Comment
//http://localhost:4444/api/comments/:id
router.post('/:id', checkAuth, createComment)

//Deelete my post
//http://localhost:4444/api/comments/:id
router.delete('/:id', checkAuth, removeComment)


//Like comment
//http://localhost:4444/api/comments/:id
router.post('/like/:id', checkAuth, likeComment)

//unliek the comment
//http://localhost:4444/api/comments/:id
// router.delete('/unlike/:id', checkAuth, unlikeComment)

export default router