import { Router } from 'express';
import * as postsController from '../controllers/posts';

const router = Router();

router.get('/', postsController.getPosts);
router.get('/:slug', postsController.getPost);

export default router;