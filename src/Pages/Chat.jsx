import React from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const Chats = () => {
  const [user, loading, error] = useAuthState(auth);
  const [Error, setError] = useState();
  const [Messages, setMessages] = useState([]);

  const { chatId } = useParams();
  console.log(chatId);

  const getMessages = async () => {
    const chatCollectionRef = collection(db, "chats");
    const q = query(chatCollectionRef, where("chatId", "==", chatId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      setError("No user found.");
      return;
    }
    querySnapshot.forEach((doc) => {
      setMessages(doc.data().messages);
    });
  };

  getMessages();

  console.log(Messages);

  return <div>Chat</div>;
};

export default Chats;
