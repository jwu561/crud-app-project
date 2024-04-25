// Homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage({ posts }) {
    return (
        <div className="posts-container">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="post">
              <h2>{post.title}</h2>
              <p>{post.timestamp.toLocaleString()}</p>
            </Link>
          ))}
        </div>
  );
}

export default Homepage;