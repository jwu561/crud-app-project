// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import Homepage from './components/Homepage';
import Post from './components/Post'; // Corrected import
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    const newPost = { id: posts.length + 1, comments: [], ...post }; // Assign a unique id
    console.log('Adding post:', newPost); // Log newPost instead of post
    setPosts([newPost, ...posts]); // Add newPost to state
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Hub</h1>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/new-post">Create New Post</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/new-post" element={<PostForm addPost={addPost} />} />
        <Route path="/post/:id" element={<Post posts={posts} setPosts={setPosts} />} />
        <Route path="/" element={<Homepage posts={posts} />} />
      </Routes>
    </Router>
  );
}

export default App;