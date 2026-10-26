import express from 'express';
import protect from '../middleware/auth.js';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/my', protect, getMyItems);
router.get('/:id', getItemById);
router.get('/', getItems);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

export default router;
