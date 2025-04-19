import { Request, Response } from 'express';
import * as postService from '../services/posts';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.toString() || '';
    
    const posts = await postService.getPosts(page, limit, search);
    const total = await postService.getTotalPosts(search);
    
    res.json({ posts, total });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostBySlug(req.params.slug);
    post ? res.json(post) : res.status(404).json({ error: 'Post not found' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};