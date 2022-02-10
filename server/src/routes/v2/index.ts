import express from 'express';
import loginUserInfoRouter from './loginUserInfo';

const router = express.Router();

// v2以下のルーティング
router.use('/loginUserInfo', loginUserInfoRouter);

export default router;