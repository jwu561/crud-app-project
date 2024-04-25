// Homepage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage({ posts }) {

  function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  


    return (
        <div className="posts-container">
          {posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="post">
              <h2>{post.title}</h2>
              <p>Posted {timeSince(new Date(post.timestamp))}</p>
              <p>{post.upvotes} upvotes</p>
            </Link>
          ))}
        </div>
  );
}

export default Homepage;