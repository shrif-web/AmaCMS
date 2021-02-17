import express from "express"
import { create, getAll, get, update, deleteById, morePackages } from "../../controllers/api/package.controller.js"
import { authorize } from "../../middlewares/auth.js"

const router = express.Router()

router.route('/')
    .post(create)
    .get(getAll)

router.route("/more")
    .get(morePackages)

router.route('/:id')
    .get(get)
    .put(update)
    .delete(deleteById)

export default router
