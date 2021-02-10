import express from "express"
import { create, getAll } from "../controllers/post.controller.js"
import { generateMethodNotAllowed } from "../controllers/default.controller.js"
import { authorize } from "../middlewares/auth.js"

const router = express.Router()

router.route('/')
    .post(create)
    .get(getAll)

export default router
