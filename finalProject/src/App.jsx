// App.js
import React, { useState } from 'react'; // Corrected import
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import Homepage from './components/Homepage';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    console.log('Adding post:', post); // Add this line
    setPosts([post, ...posts]);
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
      <Route path="/" element={<Homepage posts={posts} />} />
        <Route path="/new-post" element={<PostForm addPost={addPost} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
