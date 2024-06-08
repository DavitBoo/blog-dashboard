import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import { AuthContext } from "../context/authContext";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2rem;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  input[type="text"],
  textarea,
  input[type="file"],
  input[type="submit"] {
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  input[type="text"],
  textarea {
    width: 100%;
    margin-bottom: 1rem;
  }

  textarea {
    height: 200px;
    resize: vertical;
  }

  input[type="file"] {
    margin-bottom: 1rem;
  }

  input[type="submit"] {
     background-color: #4a00c1;
    color: white;
    border: none;
    cursor: pointer;
    padding: 0.75rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #320083;
    }
  }

  p {
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

export default function EditPost() {
  const location = useLocation();
  const { post } = location.state || {};

  const [title, setTitle] = useState(post ? post.title : "");
  const [body, setBody] = useState(post ? post.body : "");
  const [file, setFile] = useState("file.png");
  const [published, setPublished] = useState(false);
  const [token, setToken] = useState(""); // State to store the token

  const { user } = useContext(AuthContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePublished = (e) => {
    setPublished(e.target.checked);
  };

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await fetch("https://my-blog-api-14aq.onrender.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
            password: "q1w2e3r4t5",
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
        } else {
          console.error("Failed to log in");
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    handleLogin();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          thumbnail: file,
          published: published,
        }),
      });

      if (response.ok) {
        console.log("Post updated successfully");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Container>
      <h1>Blog | Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título del post" value={title} onChange={handleTitleChange} />
        <textarea placeholder="Contenido del post" value={body} onChange={handleBodyChange}></textarea>
        {0 && <input type="file" onChange={handleFileChange} />}
        <p>
          <input type="checkbox" name="published" value={published} onChange={handlePublished} />
          Publicar
        </p>
        <input type="submit" value="Guardar post" />
      </form>
    </Container>
  );
}
