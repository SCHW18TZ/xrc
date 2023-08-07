import React from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Inbox = () => {
  const [user, loading, error] = useAuthState(auth);
  const [Error, setError] = useState();
  const [Chats, setChats] = useState([]);

  const useremail = user?.email;
  const getChats = async () => {
    const chatCollectionRef = collection(db, "Chats");
    const q = query(
      chatCollectionRef,
      where("users", "array-contains", "schwitz6969@gmail.com")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      setError("No user found.");
      return;
    }
    querySnapshot.forEach((doc) => {
      setChats(doc.data());
    });
  };

  console.log(Chats);
  useEffect(() => {
    getChats();
  }, []);

  // Loop over the chats and display them
  // If there are no chats, display a message saying "No chats"

  //   for (let chat in Chats) {
  //     console.log(chat);
  //     console.log(Chats[chat]);
  //   }

  return (
    <div>
      <h1>Chats</h1>

      {Chats ? (
        <>
          {Chats?.map((chat) => {
            return <h1>{chat}</h1>;
          })}
        </>
      ) : (
        <h1>no chats</h1>
      )}
    </div>
  );
};

export default Inbox;
