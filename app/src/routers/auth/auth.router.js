import express from "express"
import { register, doRegister, logout, login, doLogin, testHome } from "../../controllers/auth/auth.controller.js"

const router = express.Router()

router.route('/register').get(register)
router.route('/register').post(doRegister)
router.route('/login').get(login)
router.route('/login').post(doLogin)
router.route('/logout').get(logout)
router.route('/').get(testHome)

export default router