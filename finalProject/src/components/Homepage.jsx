// Homepage.jsx
import React from 'react';
import './Homepage.css';

function Homepage({ posts }) {
  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
        </div>
      ))}
    </div>
  );
}

export default Homepage;