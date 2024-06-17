import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (username, password, navigate) => {
    const response = await fetch("https://my-blog-api-14aq.onrender.com/api/login", {
      method: "POST",
      mode: 'cors', // just because I have different origin. Not same domain
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" //if I donnt' specify server could not return a JSON an have a problem, but I designed the API, so it should not be necesary
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60 * 24}`; // Expires in 1 day
      document.cookie = `logedUser=${username}; path=/; max-age=${60 * 60 * 24}`;
      console.log(document.cookie);
      setUser(username)
      navigate("/");
    } else {
      const errorData = await response.json();
      console.log(errorData.error);
      throw new Error(errorData.error);
    }
  };

  const logout = () => {
    // ! =>>>
    // it gets here it is just not deleting the cookie, I should fix it.
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // ! problemas al borrar las cookies desde React, usaré el servidor mejor
    setUser(null);
  };

  useEffect(() => {
    const getTokenFromCookie = () => {
      const cookieValue = document.cookie
        .split("; ") // to split cookies into diferent elements of the array
        .find((row) => row.startsWith("authToken=")); // our cookie must have this key as a name
      if (cookieValue) {
        const token = cookieValue.split("=")[1];
        return token;
      }
      return null;
    };

    const initialToken = getTokenFromCookie();
    if (initialToken) {
      setToken(initialToken);
    }

    const getUserFromCookie = () => {
      const cookieValue = document.cookie.split(";").find((row) => row.startsWith("logedUser"));

      if (cookieValue) {
        const user = cookieValue.split("=")[1];
        console.log(user);
        return user;
      }
      return null;
    };

    const initialUser = getUserFromCookie();
    if (initialUser) {
      console.log(initialUser);
      setUser(initialUser);
    }

    const tokenChangeHandler = () => {
      const updatedToken = getTokenFromCookie();
      if (updatedToken !== token) {
        setToken(updatedToken);
      }
    };

    return () => {
      window.removeEventListener("storage", tokenChangeHandler);
    };
  }, [token]);

  return <AuthContext.Provider value={{ token, login, user, logout }}>{children}</AuthContext.Provider>;
};
