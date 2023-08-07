import React from "react";
// make this page as a dynamic page
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const UserPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [Error, setError] = useState();
  const [UserData, setUserData] = useState();

  const getUser = async () => {
    // get the username from the url
    const { username } = useParams();
    const userCollectionRef = collection(db, "users");
    const q = query(userCollectionRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      setError("No user found.");
      return;
    }
    querySnapshot.forEach((doc) => {
      setUserData(doc.data());
    });
  };

  getUser();

  return (
    <>
      {user ? (
        <div className="userPage">
          {Error ? (
            <h1>{Error}</h1>
          ) : (
            <>
              <h1>User Page</h1>
              <h2>{UserData.displayName}</h2>
              <h2>{UserData.username}</h2>
            </>
          )}
        </div>
      ) : (
        <div className="notLoggedin">
          <h1>Not Logged in</h1>
        </div>
      )}
    </>
  );
};
export default UserPage;
