import express from "express"
import paymentRouter from "./payment.router.js"
import postRouter from "./post.router.js"
import searchRouter from "./search.router.js"
import authRouter from "./auth.router.js"
import uploadRouter from "./upload.router.js"

const router = express.Router()

router.use('/payment', paymentRouter)
router.use('/post', postRouter)
router.use('/search', searchRouter)
router.use('/auth', authRouter)
router.use('/upload', uploadRouter)

export default router
