import express from 'express';
import { registerUser, loginUser, logoutUser, createAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Register route (Public)
router.post('/register', registerUser);

// Login route (Public)
router.post('/login', loginUser);

// Logout route (Protected)
router.post('/logout', protect, logoutUser);

// Create admin route (Public - allows first admin creation, but checks for existing admins)
router.post('/create-admin', createAdmin);

export default router;
