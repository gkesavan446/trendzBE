import express, { Router } from 'express';
import { forgetPassword, signin, signup, resetPassword, addtoCart } from '../controller/auth.controller.js';
import protectedRoute from '../middleware/auth.middleware.js';


const router = Router();

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword').post(resetPassword)
router.route('/cart').post(protectedRoute, addtoCart)

export default router