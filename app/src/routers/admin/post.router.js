import express from "express"
import { create } from "../../controllers/admin/post.controller.js"

const router = express.Router()

router.get('/create', create)

export default router
