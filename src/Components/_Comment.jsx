import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const _Comment = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const handleTextareaChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${post._id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          email: "test@a.b",
          commentContent: comment,
          postId: id,
        }),
      });

      if (response.ok) {
        console.log("Comment created successfully");
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }

    setComment("");
  };

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

    fetchPost();
  }, []);

  return (
    <div>
      <h1>Comentarios en la entrada: "{post.title}"</h1>
      <form action="" onSubmit={handleSubmit}>
        <textarea value={comment} onChange={handleTextareaChange} placeholder="Escribe tu comentario aquí" />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default _Comment;
