import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  align-items: center;

  > div {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.2rem;
  }

  h1 {
    margin: 1rem;
  }

  form {
    max-width: 350px;
  }

  input:not([type="submit"]) {
    margin-bottom: 2rem;
    border: 0;
    border-bottom: 1px solid var(--dark-grey);
    padding: 0.5rem;
  }
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [token, setToken] = useState("");


  // I use navigate since it is a redirection not a Link 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://my-blog-api-14aq.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        //setToken(data.token);
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // Expires in 7 days
        navigate("/");

      } else {
        console.error("Failed to log in");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in");
    }
  };


  return (
    <FormContainer>
      <h1>Login</h1>
      <div>
      <form className="d-flex-col" action="" onSubmit={handleLogin}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="btn" type="submit" value="Login" />
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </FormContainer>
  );
}
