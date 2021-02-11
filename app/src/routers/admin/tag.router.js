import express from "express"
import { index, create, store, deleteTag, edit, update } from "../../controllers/admin/tag.controller.js"

const router = express.Router()

router.route('/').get(index)
router.route('/create').get(create)
router.route('/create').post(store)
router.route('/delete/:id').get(deleteTag)
router.route('/edit/:id').get(edit)
router.route('/edit/:id').post(update)

export default router