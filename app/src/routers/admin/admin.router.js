
import express from "express"
import { index } from "../../controllers/admin/admin.controller.js"
import categoryRouter from "./category.router.js"
import tagRouter from "./tag.router.js"
import postRouter from "./post.router.js"
import packageRouter from "./package.router.js"
import userRouter from "./user.router.js"
import commentRouter from "./comment.router.js"
import socialMediaRouter from "./socialMedia.router.js"

const router = express.Router()

router.route('/').get(index)
router.use('/tag', tagRouter)
router.use('/category', categoryRouter)
router.use('/post', postRouter)
router.use('/package', packageRouter)
router.use('/user', userRouter)
router.use('/comment', commentRouter)
router.use('/social_media', socialMediaRouter)


export default router
