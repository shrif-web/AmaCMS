import express from "express"
import { search } from "../controllers/search.controller.js"
import { generateMethodNotAllowed } from "../controllers/default.controller.js"

const router = express.Router()

router.route('/')
    .get(search)
    .all(generateMethodNotAllowed('GET'))

export default router
