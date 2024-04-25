// Post.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './Post.css';

function Post({ posts }) {
  const { id } = useParams();
  const post = posts.find(post => post.id === Number(id));

  return post ? (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.timestamp.toLocaleString()}</p>
    </div>
  ) : (
    <p>Post not found</p>
  );
}

export default Post;