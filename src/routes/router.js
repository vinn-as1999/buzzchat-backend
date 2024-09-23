import * as AuthController from '../controllers/authController.js'
import * as ChatController from '../controllers/chatController.js'
import * as BlockedController from '../controllers/blockedController.js'
import tokenMiddleware from '../middlewares/tokenMiddleware.js'
import uploadImg, {setProfileController, getProfileInfo} from '../controllers/profileController.js'
import * as FriendController from '../controllers/friendsController.js'
import upload from '../config/multer.js'
import express from 'express'


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Olá mundo');
});

router.post('/api/register', AuthController.register);

router.post('/api/login', AuthController.login);

router.get('/api/restrict', tokenMiddleware, AuthController.authToken);

router.get('/api/getchats', ChatController.searchChats);

router.post('/api/friendId', ChatController.getFriendId);

router.post('/api/newchat', ChatController.newChat);

router.post('/api/newmsg', ChatController.messageRegister);

router.get('/api/msghistory', ChatController.messageHistory);

router.get('/api/isconversation', ChatController.checkConversation);

router.post('/api/uploadPicture', upload.single("file"), uploadImg);

router.post('/api/setProfile', setProfileController);

router.get('/api/getProfile', getProfileInfo);

router.post('/api/blockUser', BlockedController.blockUserController);

router.post('/api/addFriend', FriendController.addFriendController);


export default router;