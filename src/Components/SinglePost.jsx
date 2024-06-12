import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
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

    button,
    a.link {
      padding: 7px 12px;
      margin-right: 10px;
      font-size: 0.9em;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      text-decoration: none;

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
  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 1rem;

    textarea {
      width: 100%;
      height: 10rem;
      border: 2px solid #ccc;
      border-radius: 4px;
      background-color: #f8f8f8;
      font-size: 16px;
      resize: none;
      margin-bottom: .5rem;
    }
  }
`;

export default function SinglePost() {
 // ! aquí, pensando como restringir la edición con jwts

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

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
  }, [id, comments]);

  const handleDeleteComment = async (commentId) => {
    console.log(commentId);
    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${id}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // for editing the post
  const handleEditPost = () => {
    navigate("/edit-post", { state: { post } }); // Pasar el post en el estado al navegar
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  };

  const handleEditChange = (event) => {
    setEditingCommentContent(event.target.value);
  };

  const handleEditSubmit = async (event, commentId) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${id}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentContent: editingCommentContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the comment");
      }

      // Actualizar la lista de comentarios después de editar
      const updatedComments = comments.map((comment) =>
        comment._id === commentId ? { ...comment, commentContent: editingCommentContent } : comment
      );
      setComments(updatedComments);

      // Resetear el estado de edición
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

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
          {editingCommentId === comment._id ? (
            <form onSubmit={(event) => handleEditSubmit(event, comment._id)}>
              <textarea value={editingCommentContent} onChange={handleEditChange} />
              <div class="d-flex">
                <button type="submit">Save</button>
                <button onClick={() => setEditingCommentId(false)}>Close edit</button>
              </div>
            </form>
          ) : (
            <>
              <p className="comment-content">{comment.commentContent}</p>
              <button onClick={() => handleEditComment(comment._id, comment.commentContent)}>Edit comment</button>
            </>
          )}
          <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          <hr />
        </div>
      ))}
      <button className="btn" onClick={handleEditPost}>
        Edit post
      </button>
    </PostContainer>
  );
}
