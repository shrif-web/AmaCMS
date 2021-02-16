import express from "express"
import { getPost } from "../../controllers/front/post.controller.js"
import { index } from "../../controllers/front/home.controller.js"

const router = express.Router()

router.route('/post/:id').get(getPost)
router.route('/').get(index)

export default router
