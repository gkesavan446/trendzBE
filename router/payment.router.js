import express, { Router } from 'express';
import { handleCheckout, verifyPayment } from '../controller/payment.controller.js'

const router = Router();

router.route('/checkout').post(handleCheckout);

router.route('/verify').post(verifyPayment);

export default router