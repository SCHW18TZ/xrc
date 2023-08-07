import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const Search = () => {
  const [Email, setEmail] = useState("  ");
  const [user, loading, error] = useAuthState(auth);
  const [Found, setFound] = useState(false);
  const [Loading, setLoading] = useState(false);

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let email = e.target[0].value;
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.data().email === email) {
        console.log("found user");
        const username = doc.data().displayName;
        console.log(doc.data().email);
        console.log(doc.data().displayName);
        console.log(doc.data().photoURL);
        toast.success("Found: " + username);
        setFound(true);
        setLoading(false);
      } else if (doc.data().email !== email) {
        console.log("user not found");
        toast.error("User not found");
        setFound(false);
      }
    });
  };

  return (
    <>
      {user ? (
        <div>
          <Toaster />
          <h1>Search</h1>
          <div className="searchForm">
            <form onSubmit={searchUser}>
              <input
                type="email"
                placeholder="Search"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(Email);
                }}
              />
              <button type="submit">Search</button>
            </form>
            {Loading ? (
              <div>
                <h2>Loading...</h2>
              </div>
            ) : (
              <div>
                <h2>Search a user</h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>Search</h1>
          <h2>You're not logged in</h2>
          <Link to={"/login"}>
            <p>Please login to search</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Search;
