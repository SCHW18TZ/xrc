import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      {loading && <h1>Loading...</h1>}

      <div>
        {user ? (
          <>
            <div className="navbar">
              <Link to="/"> Home </Link>
              <Link to="/inbox"> Chats</Link>
              <button onClick={() => signOut(auth)}>Sign Out</button>
            </div>
          </>
        ) : (
          <div className="navbar">
            <h1>
              <Link to="/login"> Sign in</Link>
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
