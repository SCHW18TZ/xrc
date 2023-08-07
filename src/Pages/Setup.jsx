import React, { useState } from "react";
import { signOut } from "firebase/auth";
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

const Setup = () => {
  let navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const userCollectionRef = collection(db, "users");
  const [user, loading, error] = useAuthState(auth);
  const [nameInput, setnameInput] = useState("");
  const [nameavailable, setnameavailable] = useState(null);
  const [Completed, setCompleted] = useState(false);
  const [Error, setError] = useState();

  const CheckSetupCompleted = async () => {
    const q = query(userCollectionRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.data().setupComplete === true) {
        console.log("setup complete");
        navigate("/");
      }
    });
  };

  // useEffect(() => {
  //   CheckSetupCompleted();
  // }, []);

  const usernameQuery = async (e) => {
    const name = e.target.value;
    setnameInput(name);
    console.log(name);
    let q = query(userCollectionRef, where("username", "==", name));
    let querySnap = await getDocs(q);
    if (querySnap.size > 0) {
      setnameavailable(false);
      console.log(nameInput);
      setError("Username is already taken, please try another");
    } else {
      setnameavailable(true);
      console.log(nameInput);
      setError("");
    }
    //Check if name contains any special characters
    if (!/^\w+$/i.test(name)) {
      setnameavailable(false);
      console.log(nameInput);
      setError("Username contains special characters");
    }
  };

  const submitUsername = async (e) => {
    e.preventDefault();
    if (nameavailable === true) {
      // Get user's doc using their gmail
      const q = query(userCollectionRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        // Update user's doc with username
        updateDoc(doc.ref, {
          username: nameInput,
          setupComplete: true,
        });
        toast.success("Username updated");
        console.log("username updated");
        setCompleted(true);
        navigate("/");
      });
    } else {
      console.log("name not available");
      toast.error(Error);
    }
  };

  console.log(Username);
  console.log(nameavailable);
  return (
    <div>
      <h1>Setup</h1>
      <Toaster />
      <form onSubmit={submitUsername}>
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => {
            usernameQuery(e);
          }}
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default Setup;
