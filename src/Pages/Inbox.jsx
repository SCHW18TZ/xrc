import React from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

const Inbox = () => {
  const [user, loading, error] = useAuthState(auth);
  const [Error, setError] = useState();
  const [ChatList, setChatList] = useState([]);

  const useremail = user?.email;
  const getChats = async () => {
    const chatCollectionRef = collection(db, "chats");
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
      let chats = [];
      snapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setChatList(chats);
    });
  };

  console.log(ChatList);
  useEffect(() => {
    if (!user) return;
    const ChatCollectionRef = collection(db, "Chats");
    const queryChat = query(
      ChatCollectionRef,
      where("users", "array-contains", user.email)
    );

    const unsuscribe = onSnapshot(queryChat, (snapshot) => {
      let chats = [];
      snapshot.forEach((doc) => {
        chats.push({ ...doc.data(), id: doc.id });
      });
      setChatList(chats);
    });

    return () => unsuscribe();
  }, [user]);

  return (
    <div>
      {ChatList.map((chat) => (
        <div key={chat.id}>
          <Link to={`/chat/${chat.id}`}>
            <h1>{chat.users.filter((user) => user !== useremail)}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
