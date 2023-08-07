import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoggedIn = ({ user }) => {
  let navigate = useNavigate();
  const [setupComplete, setSetupComplete] = useState(false);

  const userCollectionRef = collection(db, "users");
  const checkSetup = async () => {
    const q = query(userCollectionRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.data().setupComplete === false) {
        setSetupComplete(false);
        console.log("setup not complete");
        navigate("/setup");
      }
      if (doc.data().setupComplete === true) {
        console.log("setup complete");
        setSetupComplete(true);
      }
    });
  };

  // if (setupComplete === false) {
  //   console.log("setup not complete");
  //   navigate("/setup");
  // }
  // useEffect(() => {
  //   checkSetup();
  // }, []);

  useEffect(() => {
    checkSetup();
  }, []);

  return (
    <div>
      <Toaster />
      {setupComplete ? (
        <>
          <h1>Logged in</h1>
          <h2>{user.displayName}</h2>
          <button onClick={() => signOut(auth)}>Sign Out</button>
        </>
      ) : (
        <>
          <h1>Setup not complete</h1>
          <Link to="/setup">Click here to complete setup</Link>
        </>
      )}
    </div>
  );
};

export default LoggedIn;
