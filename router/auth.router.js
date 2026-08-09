import express, { Router } from 'express';
import { forgetPassword, login, signup, resetPassword, addtoCart } from '../controller/auth.controller.js';
import protectedRoute from '../middleware/auth.middleware.js';


const router = Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword').post(resetPassword)
router.route('/cart').post(protectedRoute, addtoCart)

export default router