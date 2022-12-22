import express from 'express'
import controller from '../controllers/usersController.js'

const router = express.Router()

router.route('/').get(controller.getAllUsers).post(controller.createNewUser).patch(controller.updateUser).delete(controller.deleteUser)

export default router
