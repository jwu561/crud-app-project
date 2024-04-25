// Homepage.jsx
import React, { useState } from 'react';
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
  
  const [sortedPosts, setSortedPosts] = useState([...posts]);

  const sortByNewest = () => {
    const newSortedPosts = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setSortedPosts(newSortedPosts);
  };

  const sortByMostPopular = () => {
    const newSortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);
    setSortedPosts(newSortedPosts);
  };

  return (
    <div className="posts-container">
      <button onClick={sortByNewest}>Newest</button>
      <button onClick={sortByMostPopular}>Most Popular</button>
      {sortedPosts.map((post) => (
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