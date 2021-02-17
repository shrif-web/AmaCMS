import express from "express"
import { create, getAll, get, update, deleteById, morePackages, buyPackage, verifyPayment } from "../../controllers/api/package.controller.js"
import { authenticatedApi, addUser } from "../../middlewares/auth.js"

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

router.route('/:id/buy')
    .get(authenticatedApi, addUser, buyPackage)

router.route('/:id/verify')
    .get(authenticatedApi, verifyPayment)

export default router
