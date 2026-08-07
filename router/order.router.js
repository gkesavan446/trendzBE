import express, { Router } from 'express'
import { saveOrder, allOrder } from '../controller/order.controller.js'
import protectedRoute from '../middleware/auth.middleware.js'

const router = Router();

router.route('/saveorder').post(protectedRoute, saveOrder).get(protectedRoute, allOrder)
// router.route('/saveorder/:userId').get(protectedRoute, allOrder)

export default router;