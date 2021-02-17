import express from "express"
import { register, doRegister, logout, login, doLogin, testHome } from "../../controllers/auth/auth.controller.js"
import { authenticated, guestOnly } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/register').get(guestOnly, register)
router.route('/register').post(guestOnly, doRegister)
router.route('/login').get(guestOnly, login)
router.route('/login').post(guestOnly, doLogin)
router.route('/logout').get(authenticated, logout)
// router.route('/').get(testHome)

export default router