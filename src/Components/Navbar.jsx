import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {user ? (
        <button onClick={() => signOut(auth)}>Sign Out</button>
      ) : (
        <h1>
          <Link to="/login"> Sign in</Link>
        </h1>
      )}
    </div>
  );
};

export default Navbar;
