import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;

  h1 {
    font-size: 2rem;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 2rem;
    border-radius: 8px;
  }

  input[type="text"],
  textarea,
  input[type="file"],
  input[type="submit"] {
    font-size: 1rem;
    padding: 0.75rem;
    border: 1px solid #ddd;
    box-sizing: border-box;
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
    background-color: #6a1b9a;
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
    gap: 0.5rem;
  }

  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [published, setPublished] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const { user, token, logout } = useContext(AuthContext);

  const [fetchedLabels, setFetchedLabels] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleBodyChange = (e) => setBody(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handlePublished = (e) => setPublished(e.target.checked);

  const handleLabelChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedLabels([...selectedLabels, value]);
    } else {
      setSelectedLabels(selectedLabels.filter((labelId) => labelId !== value));
    }
  };

  const fetchLabels = async () => {
    try {
      const response = await fetch("https://my-blog-api-14aq.onrender.com/api/label");
      const data = await response.json();
      setFetchedLabels(data);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      console.log(token);

      const response = await fetch("https://my-blog-api-14aq.onrender.com/api/posts", {
        method: "POST",
        headers: {

          // ! verify token error
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          thumbnail: file,
          published,
          labels: selectedLabels,
        }),
      });

      setFormLoading(false);
      if (response.ok) {
        navigate(`/posts`);
      } else {
        const errorMsg = await response.json();
        if (errorMsg.error === "Token has expired") {
          logout();
        }
        console.error("Failed to create post", errorMsg);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setFormLoading(false);
    }
  };

  return (
    <Container>
      <h1>Blog | New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-1 align-items-start">
          <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Título del post" value={title} onChange={handleTitleChange} />
            <textarea placeholder="Contenido del post" value={body} onChange={handleBodyChange}></textarea>
            <p></p>
          </div>
          <div>
            <input type="submit" value="Guardar post" disabled={formLoading} />
            <label htmlFor="published">Publicar </label>
            <input type="checkbox" name="published" checked={published} onChange={handlePublished} />
            <div>
              {fetchedLabels.map((label) => (
                <div key={label._id}>
                  <input
                    type="checkbox"
                    id={label._id}
                    value={label._id}
                    onChange={handleLabelChange}
                  />
                  <label htmlFor={label._id}>{label.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
