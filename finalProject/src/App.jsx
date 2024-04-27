// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import Homepage from './components/Homepage';
import EditPost from './components/EditPost';
import Post from './components/Post'; // Corrected import
import './App.css';
import supabase from './client';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]); 

  const addPost = (post) => {
    const newPost = { id: posts.length + 1, comments: [],upvotes: 0,...post }; // Assign a unique id
    console.log('Adding post:', newPost); // Log newPost instead of post
    setPosts([newPost, ...posts]); // Add newPost to state
  };

  useEffect(() => {
    // Fetch posts from Supabase when the component mounts
    supabase
      .from('Post')
      .select('*')
      .then(({ data: posts, error }) => {
        if (error) console.error('Error loading posts', error);
        else setPosts(posts);
      });
  }, []);

  useEffect(() => {
    // Check if posts is defined before calling filter on it
    if (posts) {
      setFilteredPosts(
        posts.filter(post =>
          post.Title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [posts, search]); 

  // console.log(posts);
  // console.log(search);


  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Hub</h1>
        </div>
        
        <div className="search-bar">
  <input type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
</div>

        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/new-post">Create New Post</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/new-post" element={<PostForm addPost={addPost} />} />
        <Route path="/post/:id" element={<Post posts={posts} setPosts={setPosts} />} />
        <Route path="/" element={<Homepage posts={filteredPosts} />} />
        <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
      </Routes>
    </Router>
  );
}

export default App;