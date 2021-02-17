
import express from "express"
import { create, changeStatus } from "../../controllers/api/comment.controller.js"
import { authorize } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/create').post(create)
router.route('/status').post(authorize, changeStatus)

export default router