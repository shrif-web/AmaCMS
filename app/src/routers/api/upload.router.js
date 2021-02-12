import express from "express"
import { upload } from "../../controllers/api/upload.controller.js"

const router = express.Router()

router.post('/:type', upload)

export default router
