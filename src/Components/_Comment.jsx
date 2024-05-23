import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



const _Comment = () => {

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
          <h1>Comments in post "{post.title}"</h1>
          <form action="">
              <textarea name="" id=""></textarea>
              <input type="submit" value="Enviar" />
          </form>
    </div>
  )
}

export default _Comment