import express from 'express';
import protect from '../middleware/auth.js';
import { createClaim, getClaimById, getMyClaims, updateClaimStatus } from '../controllers/claimController.js';

const router = express.Router();

router.post('/', protect, createClaim);
router.get('/my', protect, getMyClaims);
router.get('/:id', protect, getClaimById);
router.put('/:id/status', protect, updateClaimStatus);

export default router;
