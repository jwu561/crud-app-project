// PostForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PostForm.css';

function PostForm({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate(); // Create a navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, content, imageUrl });
    navigate('/'); // Redirect to the homepage
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