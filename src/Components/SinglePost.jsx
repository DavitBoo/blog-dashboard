import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


export default function SinglePost() {
    const { id } = useParams();

    const [post, setPost] = useState({})    

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await fetch(`https://my-blog-api-14aq.onrender.com/api/posts/${id}`);
            
            const data = await response.json();
            setPost(data);
          } catch (error) {
            setError(error);
          }
        };
    
        fetchPost();
      }, []);

    return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
    </div>
  )
}
