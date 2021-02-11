import express from "express"
import { create, getAll, get, update, deleteById } from "../../controllers/api/post.controller.js"
import { authorize } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/')
    .post(create)
    .get(getAll)

router.route('/:id')
    .get(get)
    .put(update)
    .delete(deleteById)

router.route('/create')
    .get(createView)

export default router
