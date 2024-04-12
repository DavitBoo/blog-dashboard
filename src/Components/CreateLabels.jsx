import React, { useState } from "react";

export default function CreateLabels() {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");

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
        headers: { "Content-Type": "application/json" }, // Set the content type to JSON
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Label created successfully");
        // Optionally, redirect or show a success message
      } else {
        console.error("Failed to create label");
      }
    } catch (error) {
      console.error("Error creating label:", error);
    }
  };

  return (
    <div>
      <h1>Crear etiquetas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={label} onChange={onLabelChange} />
        <input type="text" value={description} onChange={onDescriptionChange} />
        <input type="submit" value="Crear etiqueta" />
      </form>
    </div>
  );
}
