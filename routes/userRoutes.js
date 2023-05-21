
import express from 'express'
import { deleteUser, getAllFriends, getAllUser, getUserById, getUserByName, login, signup, updateUser } from '../controllers/userControllers.js';
import  { verifyToken, verifyTokenAndAuthorization } from '../middleware/authMiddleware.js'

const router = express.Router();
router.post('/login', login);
router.post('/signup', signup);
router.route('/:id').put(verifyTokenAndAuthorization, updateUser).delete(verifyTokenAndAuthorization, deleteUser);
router.route('/find/:username').get(getUserByName)
router.route('/findbyid/:userId').get(getUserById)
router.route('/').get(getAllUser)
router.route('/find/friends/:id').get(getAllFriends)

export default router