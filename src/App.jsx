import CreateLabels from "./Components/CreateLabels";
import GetPosts from "./Components/GetPosts";
import NewPost from "./Components/NewPost";
import Register from "./Components/Register";
import SinglePost from "./Components/SinglePost";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
          <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to={`register`}>Register</Link>
            </li>
            <li>
              <Link to={`posts`}>Posts</Link>
            </li>
            <li>
              <Link to={`labels`}>Labels</Link>
            </li>
          </ul>
        </nav>
        <GlobalStyle />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<GetPosts />} />
          <Route path="/labels" element={<CreateLabels />} />
          <Route path="/" element={<NewPost />} />
          <Route path="/posts/:id" element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
