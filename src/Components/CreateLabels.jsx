import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import styled from "styled-components";

const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  margin: 2rem;
`;

const CreateLabelSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type="text"] {
      padding: 0.5rem;
      border: 1px solid #ccc;
      width: 100%;
      max-width: 400px;
    }

  
  }
`;

const CurrentLabelsSection = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;

      form {
        display: flex;
        gap: 0.5rem;

        input[type="text"] {
          padding: 0.5rem;
          border: 1px solid #ccc;
          width: 150px;
        }

        button[type="submit"] {
          padding: 0.5rem 1rem;
          border: none;
          background-color: #28a745;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #218838;
          }
        }
      }

      button {
        margin-left: 0.5rem;
        padding: 0.5rem 1rem;
        border: none;
        background-color: #ffc107;
        color: black;
        cursor: pointer;
        transition: background-color 0.3s ease;
        
        &:hover {
          background-color: #e0a800;
        }
        
        &:nth-child(2) {
          background-color: #dc3545;
          color: white;

          &:hover {
            background-color: #c82333;
          }
        }
      }
    }
  }
`;

export default function CreateLabels() {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [fetchedLabels, setFetchedLabels] = useState([]);
  const [editingLabel, setEditingLabel] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const { user, token } = useContext(AuthContext);

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: label,
      description: description,
    };

    try {
      const response = await fetch("https://my-blog-api-14aq.onrender.com/api/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Label created successfully");
        setLabel(""); // Clear the input fields after successful creation
        setDescription(""); // Clear the input fields after successful creation
        fetchLabels(); // Refresh the list of labels
      } else {
        console.error("Failed to create label");
      }
    } catch (error) {
      console.error("Error creating label:", error);
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

  const handleEditLabel = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/label/${editingLabel}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingName,
          description: editingDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the label");
      }
      setEditingLabel(null);
      fetchLabels(); // Refresh the list of labels
    } catch (error) {
      console.error("Error updating label:", error);
    }
  };

  const handleEditClick = (label) => {
    setEditingLabel(label._id);
    setEditingName(label.name);
    setEditingDescription(label.description);
  };

  const handleDeleteLabel = async (id) => {
    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/label/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the comment");
      }

      fetchLabels();
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  };

  return (
    <LabelsContainer>
      <CreateLabelSection>
        <h1>Crear etiquetas</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="nombre"
            type="text"
            value={label}
            onChange={onLabelChange}
          />
          <input
            placeholder="descripción"
            type="text"
            value={description}
            onChange={onDescriptionChange}
          />
          <input class="btn" type="submit" value="Crear etiqueta" />
        </form>
      </CreateLabelSection>
      <CurrentLabelsSection>
        <h2>Listado de etiquetas</h2>
        <ul>
          {fetchedLabels.map((label) => (
            <li key={label._id}>
              {editingLabel === label._id ? (
                <form onSubmit={handleEditLabel}>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                  />
                  <button type="submit">Guardar</button>
                </form>
              ) : (
                <>
                  {label.name} - {label.description}
                  <div class="d-flex">
                    <button onClick={() => handleEditClick(label)}>Edit</button>
                    <button onClick={() => handleDeleteLabel(label._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </CurrentLabelsSection>
    </LabelsContainer>
  );
}
