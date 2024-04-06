import React, { useState } from "react";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: user,
      password: password,
    };

    try {
      const response = await fetch("https://my-blog-api-14aq.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set the content type to JSON
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("User created successfully");
        // Optionally, redirect or show a success message
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h1>prueba</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" value={user} onChange={handleUserChange} />
        <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
        <input type="submit" value="Guardar usuario" />
      </form>
    </div>
  );
}
