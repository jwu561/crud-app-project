// PostForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';

function PostForm({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date();
    addPost({ title, content, imageUrl, timestamp });
    navigate('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostForm;