import pool from '../config/db';

interface Comment {
  id: number;
  post_id: number;
  author: string;
  content: string;
  date: Date;
}

export const getCommentsByPostId = async (postId: number) => {
  const { rows } = await pool.query(
    'SELECT * FROM comments WHERE post_id = $1 ORDER BY date DESC',
    [postId]
  );
  return rows;
};

export const createComment = async (comment: Omit<Comment, 'id' | 'date'>) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, author, content)
     VALUES ($1, $2, $3) RETURNING *`,
    [comment.post_id, comment.author, comment.content]
  );
  return rows[0];
};