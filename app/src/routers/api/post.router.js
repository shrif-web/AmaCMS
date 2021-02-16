import express from "express"
import { create, getAll, get, update, deleteById, likePost } from "../../controllers/api/post.controller.js"
import { authorize, authenticatedApi } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/')
    .post(create)
    .get(getAll)

router.route('/:id')
    .get(get)
    .put(update)
    .delete(deleteById)

router.route("/like")
    .post(authenticatedApi, likePost)

export default router
