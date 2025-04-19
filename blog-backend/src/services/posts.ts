import pool from '../config/db';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  slug: string;
}

export const getPosts = async (page: number, limit: number, search: string) => {
  const offset = (page - 1) * limit;
  const { rows } = await pool.query(
    `SELECT id, title, author, date, slug 
     FROM posts 
     WHERE title ILIKE $1 
     ORDER BY date DESC 
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset]
  );
  return rows;
};

export const getPostBySlug = async (slug: string) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1', [slug]);
  return rows[0];
};

export const getTotalPosts = async (search: string) => {
  const { rows } = await pool.query(
    'SELECT COUNT(*) FROM posts WHERE title ILIKE $1',
    [`%${search}%`]
  );
  return parseInt(rows[0].count);
};