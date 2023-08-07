import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Chats from "./Pages/Chats";
import Setup from "./Pages/Setup";
import Search from "./Pages/Search";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;
