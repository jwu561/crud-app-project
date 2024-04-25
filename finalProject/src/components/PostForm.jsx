// PostForm.jsx
import React, { useState } from 'react';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, imageUrl });
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