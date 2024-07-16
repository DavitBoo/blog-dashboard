import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Posts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 1rem;
  padding-top: 1rem;

  li {
    width: 23%;
    min-width: 15rem;
    background-color: var(--light-grey);
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 3px 3px 9px #f5f5f5cc, -0px -0px 4px #232323cc;
  }

  li > .d-flex {
    align-items: flex-start;
    justify-content: space-between;
  }

  .published, .unpublished {
    display: inline-block;
    padding: .25rem .5rem;
    border-radius: 0.5rem;
  }

  .published {
    background-color: #dbf1de;
    border: 1px solid #077015;
    color: #077015;
  }

  .unpublished {
    border: 1px solid #6c0707;
    background-color: #ecd9d9;
    color: #6c0707;
  }

  .labels {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .label {
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.85rem;
    color: #333;
  }
`;

export default function GetPosts() {
  const [posts, setPosts] = useState([]);
  const [labels, setLabels] = useState({});
  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleDateString("es-ES", options).replace(",", " a las");
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " [...]";
    }
    return text;
  };

  useEffect(() => {
    const fetchPostsAndLabels = async () => {
      try {
        const [postsResponse, labelsResponse] = await Promise.all([
          fetch("https://my-blog-api-14aq.onrender.com/api/posts"),
          fetch("https://my-blog-api-14aq.onrender.com/api/label")
        ]);

        // to parse response => .json()
        const postsData = await postsResponse.json();
        const labelsData = await labelsResponse.json();

        const labelsMap = labelsData.reduce((map, label) => {
          map[label._id] = label;
          return map;
        }, {});

        setPosts(postsData);
        setLabels(labelsMap);
      } catch (error) {
        setError(error);
      }
    };

    fetchPostsAndLabels();
  }, []);

  if (error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <h2 className="ms-3">Hay {posts.length} artículos escritos</h2>
          <Posts>
            {posts.map((post) => (
              <li key={post._id}>
                <div className="d-flex">
                  <h2>
                    <Link to={`/posts/${post._id}`}>{post.title}</Link>
                  </h2>
                  {post.published ? (
                    <p className="published">Publicado</p>
                  ) : (
                    <p className="unpublished">No publicado</p>
                  )}
                </div>
                <p>{truncateText(post.body, 20)}</p>
                <p>{formatDate(post.timestamp)}</p>
                <div className="labels">
                  {post.labels.map((labelId) => (
                    <span key={labelId} className="label">
                      {labels[labelId]?.name || "Cargando..."}
                    </span>
                  ))}
                </div>
                <Link className="link" to={`/posts/${post._id}/comment`}>
                  <h6>Add Comment</h6>
                </Link>
              </li>
            ))}
          </Posts>
        </>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}
