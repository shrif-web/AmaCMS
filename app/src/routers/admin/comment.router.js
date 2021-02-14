import express from "express"
import { index, deleteComment, changeStatus } from "../../controllers/admin/comment.controller.js"

const router = express.Router()

router.route('/').get(index)
router.route('/delete/:id').get(deleteComment)
router.route('/changeStatus/:id').get(changeStatus)

export default router