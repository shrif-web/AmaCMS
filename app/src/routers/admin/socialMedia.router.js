import express from "express"
import { create, store, deleteSocialMedia, edit, update } from "../../controllers/admin/socialMedia.controller.js"

const router = express.Router()

router.route('/create').get(create)
router.route('/create').post(store)
router.route('/delete/:id').get(deleteSocialMedia)
router.route('/edit/:id').get(edit)
router.route('/edit/:id').post(update)

export default router