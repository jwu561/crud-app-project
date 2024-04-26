// Homepage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link } from 'react-router-dom';
import './Homepage.css';
import  supabase  from '../client'


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
  
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    setSortedPosts([...posts]);
  }, [posts]); // Add posts as a dependency

  const sortByNewest = () => {
    const newSortedPosts = [...sortedPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSortedPosts(newSortedPosts);
  };

  const sortByMostPopular = () => {
    const newSortedPosts = [...sortedPosts].sort((a, b) => b.Upvotes - a.Upvotes);
    setSortedPosts(newSortedPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: posts, error } = await supabase.from('Post').select('*');
      if (error) console.error('Error fetching posts:', error);
      else setSortedPosts(posts);
    };

    fetchPosts();
  }, []);


  return (
    <div className="posts-container">
      <div className="button-container">
  <button onClick={sortByNewest}>Newest</button>
  <button onClick={sortByMostPopular}>Most Popular</button>
</div>
      {sortedPosts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`} className="post">
          <h2>{post.Title}</h2>
          <p>Posted {timeSince(new Date(post.created_at))}</p>
          <p>{post.Upvotes} upvotes</p>
        </Link>
      ))}
    </div>
  );
}

export default Homepage;