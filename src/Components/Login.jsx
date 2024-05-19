import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

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
  // const [token, setToken] = useState("");


  // I use navigate since it is a redirection not a Link 
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      await login(username, password, navigate);
      
      
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
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
