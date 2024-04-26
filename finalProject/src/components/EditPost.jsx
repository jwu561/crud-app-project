// EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('Post')
      .select('*')
      .eq('id', id)
      .single();

    if (error) console.error('Error fetching post:', error);
    else if (data) setPost(data);
  }

  useEffect(() => {
    if (post) {
      setFormData({ title: post.Title, content: post.Content, imageUrl: post.ImageURL });
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('Post')
      .update({
        Title: formData.title,
        Content: formData.content,
        ImageURL: formData.imageUrl
      })
      .eq('id', post.id);

    if (error) console.error('Error updating post:', error);

    navigate('/');
    
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;