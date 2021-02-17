import express from "express"
import { create, getAll, get, update, deleteById, likePost, morePosts } from "../../controllers/api/post.controller.js"
import { authorize, authenticatedApi } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/')
    .post(authorize, create)
    .get(getAll)

router.route("/more")
    .get(morePosts)

router.route('/:id')
    .get(get)
    .put(authorize, update)
    .delete(authorize, deleteById)

router.route("/like")
    .post(authenticatedApi, likePost)

export default router
