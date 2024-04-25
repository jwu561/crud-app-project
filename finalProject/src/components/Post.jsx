// Post.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import './Post.css';

function Post({ posts, setPosts }) {
  const { id } = useParams();
  const post = posts.find(post => post.id === Number(id));
  const navigate = useNavigate();

  const addComment = (comment) => {
    setPosts(posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, comments: [...p.comments, comment] };
      } else {
        return p;
      }
    }));
  };

  const upvotePost = () => {
    setPosts(posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, upvotes: p.upvotes + 1 };
      } else {
        return p;
      }
    }));
  };

  const deletePost = () => {
    setPosts(posts.filter(p => p.id !== post.id));
    navigate('/');
  };

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

  return post ? (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>Posted {timeSince(new Date(post.timestamp))}</p>
      <button onClick={upvotePost}>👍 {post.upvotes}</button>
      <button onClick={deletePost}>Delete Post</button>
      <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
      <CommentForm addComment={addComment} />
      {post.comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  ) : (
    <p>Post not found</p>
  );
}

export default Post;