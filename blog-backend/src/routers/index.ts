import { Router } from 'express';
import postRouter from './posts';
import commentsRouter from './comments';

const router = Router();
router.use('/posts', postRouter);
router.use('/comments', commentsRouter);

export default router