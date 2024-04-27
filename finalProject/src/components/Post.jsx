import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from './CommentForm';
import './Post.css';
import supabase from '../client';

function Post({ posts, setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true); // Add this line
      const { data: post, error } = await supabase
        .from('Post')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching post:', error);
      else setPost(post);
      console.log(post.ImageUrl)
      setIsLoading(false); // Add this line
    };

    fetchPost();
  }, [id]);

  

  const upvotePost = async () => {
    const { error } = await supabase
      .from('Post')
      .update({ Upvotes: post.Upvotes + 1 })
      .eq('id', post.id);
    if (error) console.error('Error upvoting post:', error);
    else setPost({ ...post, Upvotes: post.Upvotes + 1 });
  };

  const deletePost = async () => {
    // First, delete the comments associated with the post
    const { error: deleteCommentsError } = await supabase
      .from('Comments')
      .delete()
      .eq('post_id', post.id);
    if (deleteCommentsError) {
      console.error('Error deleting comments:', deleteCommentsError);
      return;
    }
  
    // Then, delete the post
    const { error: deletePostError } = await supabase
      .from('Post')
      .delete()
      .eq('id', post.id);
    if (deletePostError) {
      console.error('Error deleting post:', deletePostError);
    } else {
      navigate('/');
      // Update the posts state
      const newPosts = posts.filter(p => p.id !== post.id);
      setPosts(newPosts);
    }
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

  const addComment = async (commentText) => {
    const { error } = await supabase
      .from('Comments')
      .insert([
        { post_id: post.id, content: commentText },
      ]);
  
    if (error) {
      console.error('Error adding comment:', error);
    } else {
      // Fetch the updated list of comments and update state
      const { data: comments, error: fetchError } = await supabase
        .from('Comments')
        .select('*')
        .eq('post_id', post.id);
  
      if (fetchError) {
        console.error('Error fetching comments:', fetchError);
      } else {
        setPost({ ...post, comments });
      }
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : post ? (
    <div className="post">
      {post && post.Title && <h2>{post.Title}</h2>}
{post && post.Content && <p>{post.Content}</p>}
{post && post.ImageURL && <img src={post.ImageURL} alt={post.Title} />}
      <p>Posted {timeSince(new Date(post.created_at))}</p>
      <button onClick={upvotePost}>👍 {post.Upvotes}</button>
      <button onClick={deletePost}>Delete Post</button>
      <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
      <CommentForm addComment={addComment} />
      {post && post.comments && post.comments.map((comment, index) => (
  <p key={index}>{comment.content}</p>
))}
    </div>
  ) : (
    <p>Post not found</p>
  );
}

export default Post;