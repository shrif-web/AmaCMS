import express from "express"
import { index, create, edit } from "../../controllers/admin/post.controller.js"

const router = express.Router()

router.get('/', index)
router.get('/create', create)
router.get('/edit/:id', edit)

export default router
