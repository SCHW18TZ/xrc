import React from "react";
// make this page as a dynamic page
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

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

  const createChat = async () => {
    const chatCollectionRef = collection(db, "Chats");
    const q = query(
      chatCollectionRef,
      where("users", "array-contains", user.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      addDoc(chatCollectionRef, {
        users: [user.email, UserData.email],
        chatId: user.uid + UserData.uid,
        createdAt: new Date().getTime(),
        messages: [],
      });
      return;
      toast.success("Chat created");
    }
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <>
      <Toaster />
      {user ? (
        <div className="userPage">
          {Error ? (
            <h1>{Error}</h1>
          ) : (
            <>
              <h1>User Page</h1>
              <h2>{UserData?.displayName}</h2>
              <h2>{UserData?.username}</h2>
              <button onClick={createChat}>Message {UserData?.username}</button>
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
