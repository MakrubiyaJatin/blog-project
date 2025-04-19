import { Request, Response } from 'express';
import * as commentService from '../services/comments';

export const getComments = async (req: Request, res: Response): Promise<any> => {
  try {
    const postId = parseInt(req.query.postId as string);
    if (isNaN(postId)) return res.status(400).json({ error: 'Invalid post ID' });

    const comments = await commentService.getCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { postId, author, content } = req.body;
    if (!postId || !author || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newComment = await commentService.createComment({
      post_id: postId,
      author,
      content
    });
    
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};