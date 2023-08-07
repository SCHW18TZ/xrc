import React from "react";
import { Link } from "react-router-dom";
const NotLoggedIn = () => {
  return (
    <div>
      <h1>Not Logged in</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default NotLoggedIn;
