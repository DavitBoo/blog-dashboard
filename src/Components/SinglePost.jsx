import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #333;
  }

  p {
    font-size: 1.2em;
    line-height: 1.6;
    color: #555;

  }

  .comment {
    padding: 15px;
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &-header {
      font-weight: bold;
      margin-bottom: 5px;
      color: #007bff;
    }

    &-content {
      font-size: 1em;
      margin-bottom: 10px;
      color: #333;
    }

    button {
      padding: 5px 10px;
      margin-right: 10px;
      font-size: 0.9em;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }

      &:last-child {
        background-color: #dc3545;

        &:hover {
          background-color: #c82333;
        }
      }
    }

    hr {
      margin-top: 20px;
      border: 0;
      border-top: 1px solid #ddd;
    }
  }
`;

export default function SinglePost() {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${id}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <PostContainer>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <p className="comment-header">
            {comment.username} - {new Date(comment.timestamp).toLocaleString()}
          </p>
          <p className="comment-content">{comment.commentContent}</p>
          <button>Edit</button>
          <button>Delete</button>
          <hr />
        </div>
      ))}
    </PostContainer>
  );
}
