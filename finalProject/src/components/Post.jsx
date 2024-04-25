// Post.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import './Post.css';

function Post({ posts, setPosts }) {
  const { id } = useParams();
  const post = posts.find(post => post.id === Number(id));

  const addComment = (comment) => {
    setPosts(posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, comments: [...p.comments, comment] };
      } else {
        return p;
      }
    }));
  };

  return post ? (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.timestamp.toLocaleString()}</p>
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