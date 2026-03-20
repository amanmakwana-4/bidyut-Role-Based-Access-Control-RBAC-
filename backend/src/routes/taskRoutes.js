import express from 'express';
import {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Create task
router.post('/', protect, createTask);

// Get user's own tasks (MUST come before GET / and /:id)
router.get('/my', protect, getMyTasks);

// Get all tasks (Admin only)
router.get('/', protect, authorize('admin'), getAllTasks);

// Update task
router.put('/:id', protect, updateTask);

// Delete task
router.delete('/:id', protect, deleteTask);

export default router;
