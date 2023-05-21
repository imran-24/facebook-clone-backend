import express from 'express'
import { createPost, deletePost, getAllPost, getPost, getUsersPost, likePost, commentPost, updatePost } from '../controllers/postControllers.js';

import  { verifyToken, verifyTokenAndCRUD } from '../middleware/authMiddleware.js'
const router = express.Router();

router.post('/',verifyToken, createPost);
router.route('/:id').put(verifyTokenAndCRUD, updatePost).delete(verifyTokenAndCRUD, deletePost)
// router.route('/:id').get(getPost)
router.route('/like/:id').put( likePost)
router.route('/comment/:id').put( commentPost)

router.route('/:id').get(getAllPost)
router.route('/profile/:username').get(getUsersPost)


export default router