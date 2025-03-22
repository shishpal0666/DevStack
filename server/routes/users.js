import express from 'express';

import { signin, signup, getRefreshTokens, googleSignin } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/google', googleSignin);
router.post('/google/refresh-token', getRefreshTokens);

export default router;