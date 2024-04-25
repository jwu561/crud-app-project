// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostForm from './components/PostForm';
import Homepage from './components/Homepage';
import './App.css';

function App() {
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
        <Route path="/" element={<Homepage />} /> {/* use the Homepage component */}
        <Route path="/new-post" element={<PostForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
