
import express from 'express'
import {  sendRequest, acceptRequest, deleteFriend, deleteRequest, getFriendList, getAllFollowers } from '../controllers/friendControllers.js';
import  { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router();
router.route('/send').post(verifyToken, sendRequest);
router.route('/friendList/:id').get(verifyToken, getFriendList);
router.route('/followerList/:id').get( getAllFollowers);
router.route('/accept').put(verifyToken, acceptRequest)
router.route('/delete-request').put(verifyToken, deleteRequest);
router.route('/delete-friend').put(verifyToken, deleteFriend);

export default router