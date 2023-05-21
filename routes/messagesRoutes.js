  
import express from 'express'
import { getLastMessage, getMessage, newMessage } from '../controllers/messageControllers.js';
import  { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();
router.route('/').post( newMessage);
router.route('/:conversationId').get( getMessage);
router.route('/lastMessage/:conversationId').get( getLastMessage);
// router.route('/followerList/:id').get( getAllFollowers);
// router.route('/accept').put(verifyToken, acceptRequest)
// router.route('/delete-request').put(verifyToken, deleteRequest);
// router.route('/delete-friend').put(verifyToken, deleteFriend);

export default router