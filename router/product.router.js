import express, { Router } from 'express';
import { createProduct, deleteProductById, getALLProducts, getProductById, updateProductById } from "../controller/product.controller.js";
import protectedRoute from '../middleware/auth.middleware.js';
import isAdmin from '../middleware/admin.middleware.js'
import { upload } from "../middleware/upload.middleware.js";



const router = Router();

// router.route('/').get(getALLProducts).post(protecedRoute, isAdmin, createProduct);
router.route('/').get(getALLProducts).post(protectedRoute, isAdmin, upload.single("image"), createProduct);
router.route('/:id').get(getProductById).patch(protectedRoute, isAdmin, upload.single("image"), updateProductById).delete(protectedRoute, isAdmin, deleteProductById);

export default router;