import express from "express"
import { index } from "../../controllers/admin/admin.controller.js"
import categoryRouter from "./category.router.js"
import tagRouter from "./tag.router.js"
import postRouter from "./post.router.js"
import userRouter from "./user.router.js"

const router = express.Router()

router.route('/').get(index)
router.use('/tag', tagRouter)
router.use('/category', categoryRouter)
router.use('/post', postRouter)
router.use('/user', userRouter)


export default router
