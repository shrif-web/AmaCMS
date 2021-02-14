import express from "express"
import { index, edit, update } from "../../controllers/profile/profile.controller.js"

const router = express.Router()

// TODO : Prevent users from entering other profiles
router.route('').get(index)
router.route('/edit').get(edit)
router.route('/edit').post(update)

export default router