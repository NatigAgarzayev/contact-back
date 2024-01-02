import { Router } from "express"
import { createPost, getAll, getById, removePost, getPostComments, likePost, getUserPosts, getMyPosts, getUsersPosts, updatePost  } from "../controllers/posts.js"
import { checkAuth } from "../utils/checkAuth.js"
const router = new Router() 

//Create post
//http://localhost:4444/api/posts
router.post('/', checkAuth, createPost)

//Get All
//http://localhost:4444/api/posts
router.get('/', getAll)

//Get by ID
//http://localhost:4444/api/posts/:id
router.get('/:id', getById)

//get post by Id
//http://localhost:4444/api/posts/user/:id
router.get('/user/:id', getUserPosts)

//Get my posts
//http://localhost:4444/api/posts/user/me
router.get('/users/me', checkAuth, getMyPosts)

//Get users posts
//http://localhost:4444/api/posts/user/:id
router.get('/users/:id', checkAuth, getUsersPosts)

//Delete my post
//http://localhost:4444/api/posts/:id
router.delete('/:id', checkAuth, removePost)

//Get posts comment
//http://localhost:4444/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

//Like post
//http://localhost:4444/api/posts/like/:id
router.post('/like/:id', checkAuth, likePost)

// edit post
router.put('/:id', checkAuth, updatePost)

export default router