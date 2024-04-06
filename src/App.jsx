import GetPosts from "./Components/GetPosts";
import NewPost from "./Components/NewPost";
import Register from "./Components/Register";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="App">
        <nav>
            <ul>
              <li>
                <Link to={`register`}>Register</Link>
                <Link to={`posts`}>Posts</Link>

              </li>
      
            </ul>
          </nav>
          <GlobalStyle />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<GetPosts />} />
            <Route path="/" element={<NewPost />} />
          </Routes>
      
      </div>
    </Router>
  );
}

export default App;