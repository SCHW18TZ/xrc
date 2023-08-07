import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Setup from "./Pages/Setup";
import Search from "./Pages/Search";
import Navbar from "./Components/Navbar";
import "./App.css";
import UserPage from "./Pages/UserPage";
import Inbox from "./Pages/Inbox";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:chatid" element={<Chat />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/:username" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
