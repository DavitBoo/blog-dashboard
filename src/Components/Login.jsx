import React from 'react'
import styled from 'styled-components';

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
    border-radius: .2rem;
  }

  h1{
    margin: 1rem;
  }
  
  form {
    max-width: 350px;
  }

  input:not([type='submit']){
    margin-bottom: 2rem;
    border: 0;
    border-bottom: 1px solid var(--dark-grey);
    padding: .5rem;
  }
`;


export default function Login() {
  return (
    <FormContainer>
      <h1>Login</h1>
<div>
  
          <form className='d-flex-col' action="">
            <input placeholder='username' type="text" name="username" id="" />
            <input placeholder='password' type="password" name="" id="" />
            <input className='btn' type="submit" value="Login" />
          </form>
</div>

    </FormContainer>
  )
}
