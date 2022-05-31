import "./App.css";
import React from "react";
import Todo from "./pages/Todo";
import { Home } from "./pages/Home";
import Login from "./pages/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks/:id" element={<Home />} />
          <Route path="/task/:id" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
