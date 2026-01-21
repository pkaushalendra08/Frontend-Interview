const BASE_URL = 'http://localhost:3001';

export type Blog = {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
};

// Fetch all blogs
export const getBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${BASE_URL}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

// Fetch single blog
export const getBlogById = async (id: string): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/blogs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
};

// Create new blog
export const createBlog = async (data: Omit<Blog, 'id' | 'date'>) => {
  const newBlog = {
    ...data,
    date: new Date().toISOString(),
  };
  
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBlog),
  });
  
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
};