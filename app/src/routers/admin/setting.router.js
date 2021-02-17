import express from "express"
import { index } from "../../controllers/admin/setting.controller.js"

const router = express.Router()

router.route('/')
    .get(index)

export default router
