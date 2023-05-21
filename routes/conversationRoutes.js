
import express from 'express'
import {  createConversation, getConversation,  } from '../controllers/conversationControllers.js';
import  { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();
router.route('/').post( createConversation);
router.route('/:userId').get( getConversation);
// router.route('/followerList/:id').get( getAllFollowers);
// router.route('/accept').put(verifyToken, acceptRequest)
// router.route('/delete-request').put(verifyToken, deleteRequest);
// router.route('/delete-friend').put(verifyToken, deleteFriend);

export default router