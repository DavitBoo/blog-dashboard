import React, { useEffect, useState } from "react";

export default function GetPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://my-blog-api-14aq.onrender.com/api/posts");
        console.log(response);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}
