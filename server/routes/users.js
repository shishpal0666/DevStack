import express from 'express';

import { signin, signup, getRefreshTokens, googleSignin, signout, checkUserStatus } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/google', googleSignin);
router.get('/signout', signout);
router.post('/google/refresh-token', getRefreshTokens);
// router.get('/checkstatus', auth, checkUserStatus);

export default router;