import express from 'express';
import { getProfile, getAllUsers, deleteUser, adminOnlyRoute } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// User routes
router.get('/profile', protect, getProfile);

// Admin routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.get('/admin', protect, authorize('admin'), adminOnlyRoute);

export default router;
