import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { AuthContext } from "../context/authContext";

const Container = styled.div`
    text-align: center;


    form{
        display: flex;
        flex-direction: column;
          padding-left: 5%;
          padding-right: 5%;
          gap: 2rem;
    }
`;

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState("file.png");
  const [published, setPublished] = useState(false)
  const [token, setToken] = useState(""); // State to store the token

  const {user} = useContext(AuthContext);

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
  }

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
  }, [user])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("body", body);
    // formData.append("thumbnail", file);

    try {
      const response = await fetch("https://my-blog-api-14aq.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          thumbnail: file,
          published: published
        }),
      });

      if (response.ok) {
        console.log("Post created successfully");
        // Optionally, redirect or show a success message
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Container>
      <h1>Blog | New Post</h1>
      {/* <button onClick={handleLogin}>Login</button> */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título del post" value={title} onChange={handleTitleChange} />
        <textarea placeholder="Contenido del post" value={body} onChange={handleBodyChange}></textarea>
        {0 && <input type="file" onChange={handleFileChange} />}
        <p><input type="checkbox" name="published" id="" value={false} onChange={handlePublished}/> Publicar</p>
        <input type="submit" value="Guardar post" />
      </form>
    </Container>
  );
}