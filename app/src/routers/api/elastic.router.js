import express from "express"
import { sync } from "../../controllers/api/elastic.controller.js"
import { authorize } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/sync')
    .get(sync)

export default router
