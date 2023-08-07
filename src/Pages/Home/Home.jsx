import React from "react";
import { Link } from "react-router-dom";
import { auth, provider, db } from "../../firebase";
// import { useSignInWithPopup } from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
import {
  where,
  query,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    console.log("loading", error);
  }

  console.log("user", user);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : user ? (
        <LoggedIn user={user} />
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default Home;
