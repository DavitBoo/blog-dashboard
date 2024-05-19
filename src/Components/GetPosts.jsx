import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 


export default function GetPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
  
    return date.toLocaleDateString('es-ES', options).replace(',', ' a las');
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://my-blog-api-14aq.onrender.com/api/posts");
        
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
              <h2>
                <Link to={`/posts/${post._id}`} test="hey">{post.title}</Link>
              </h2>
              <p>{post.body}</p>
              <p>{formatDate(post.timestamp)}</p>
              { post.published ? <><p className="published">Publicado</p></> : <p className="unpublished">No publicado</p>}
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}
