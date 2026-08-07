import express, { Router } from 'express';
import { handleCheckout } from '../controller/payment.controller.js'

const router = Router();

router.route('/checkout').post(handleCheckout);

export default router