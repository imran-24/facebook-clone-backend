import express from 'express'
import { getAllSave, updateSave } from '../controllers/saveControllers.js';

import  { verifyToken } from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/:id').put(verifyToken, updateSave)
router.route('/:id').get(verifyToken, getAllSave)

export default router