import express from "express"
import { create, getAll, get, update, deleteById, createView } from "../controllers/post.controller.js"
import { authorize } from "../middlewares/auth.js"

const router = express.Router()

// APIs
router.route('/')
    .post(create)
    .get(getAll)

router.route('/:id')
    .get(get)
    .put(update)
    .delete(deleteById)

// Views

router.route('/create')
    .get(createView)

export default router
