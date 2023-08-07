import React from "react";
import { Link } from "react-router-dom";
import { auth, provider, db } from "../firebase";
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

import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userCollectionRef = collection(db, "users");
        const q = query(userCollectionRef, where("email", "==", user.email));
        getDocs(q).then((querySnapshot) => {
          if (querySnapshot.empty) {
            addDoc(userCollectionRef, {
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              createdAt: serverTimestamp(),
              setupComplete: false,
              roles: ["user"],
              isVerified: false,
              isDeveloper: false,
            });
          }
        });

        // const userDocRef = doc(db, "users", user.email);
        // getDoc(userDocRef).then((docSnapshot) => {
        //   if (!docSnapshot.exists()) {
        //     setDoc(userDocRef, {
        //       email: user.email,
        //       displayName: user.displayName,
        //       photoURL: user.photoURL,
        //     });
        //   }
        // });
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div className="login">
        <div className="login__container">
          <div className="login__text">
            <GoogleButton onClick={loginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
