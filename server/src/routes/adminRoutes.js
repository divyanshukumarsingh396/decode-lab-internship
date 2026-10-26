import express from 'express';
import protect, { adminOnly } from '../middleware/auth.js';
import { getDashboardStats, getAllItems, getAllUsers, updateItemStatus, deleteItemAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard', protect, adminOnly, getDashboardStats);
router.get('/items', protect, adminOnly, getAllItems);
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/items/:id/status', protect, adminOnly, updateItemStatus);
router.delete('/items/:id', protect, adminOnly, deleteItemAdmin);

export default router;
