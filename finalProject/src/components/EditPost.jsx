// EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost({ posts, setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(post => post.id === Number(id));
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });

  useEffect(() => {
    if (post) {
      setFormData({ title: post.title, content: post.content, imageUrl: post.imageUrl });
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPosts = posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, ...formData };
      } else {
        return p;
      }
    });
    setPosts(updatedPosts);
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