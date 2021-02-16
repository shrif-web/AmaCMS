import express from "express"
import { getPost } from "../../controllers/front/post.controller.js"


const router = express.Router()

router.route('/post/:id').get(getPost)

export default router
