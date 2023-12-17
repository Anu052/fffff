import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/Home" element={<Home />} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;


