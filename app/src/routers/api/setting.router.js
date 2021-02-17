import express from "express"
import { update } from "../../controllers/api/setting.controller.js"
import { authorize } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/')
    .put(authorize, update)

export default router
