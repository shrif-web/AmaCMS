import express from "express"
import { request, verify } from "../controllers/payment.controller.js"
import { generateMethodNotAllowed } from "../controllers/default.controller.js"

const router = express.Router()

router.route('/request')
    .get(request)
    .all(generateMethodNotAllowed('GET'))

router.route('/verify')
    .get(verify)
    .all(generateMethodNotAllowed('GET'))


export default router
