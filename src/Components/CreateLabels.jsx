import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import styled from "styled-components";

const LabelsContainer = styled.div`
  min-height: 50vh;
  align-items: center;
  gap: 3rem;
  margin: 0 3rem;
  flex-wrap: wrap;
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


  // ! aquí. Toca hacer que esto borre
  const handleDeleteLabel = async(id) => {
    try {
      const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/label/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the comment");
      }
    } catch (error) {
      console.error("Error deleting label:", error);
    }
  }

  return (
    <LabelsContainer className="d-flex">
      <div className="create-label">
        <h1>Crear etiquetas</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder="nombre" type="text" value={label} onChange={onLabelChange} />
          <input placeholder="descripción" type="text" value={description} onChange={onDescriptionChange} />
          <input type="submit" value="Crear etiqueta" />
        </form>
      </div>
      <div className="current-labels">
        <h2 className="h2">Listado de etiquetas</h2>
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
                  <button onClick={() => handleEditClick(label)}>Edit</button>
                  <button onClick={() => handleDeleteLabel(label.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </LabelsContainer>
  );
}
