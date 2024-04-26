// PostForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostForm.css';
import  supabase  from '../client'

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase
    .from('Post')
    .insert([
      { Title: title, Content: content, ImageURL: imageUrl },
    ]);
  
    // Handle the response
    if (error) {
      console.error('Error: ', error);
    } else {
      // Clear the form
      setTitle('');
      setContent('');
      setImageUrl('');
  
      // Navigate to the homepage
      navigate('/');
    }
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