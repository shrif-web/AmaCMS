
import express from "express"
import { create, changeStatus } from "../../controllers/api/comment.controller.js"

const router = express.Router()

router.route('/create').post(create)
router.route('/status').post(changeStatus) // TODO : Authorized middleware (only for admin)

export default router