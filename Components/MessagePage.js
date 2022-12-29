import { app } from "../Components/Firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import style from "../styles/messagePage.module.css";
import Message from "../Components/Message";
import { useEffect, useState, useRef } from "react";

function MessagePage() {
  const db = getFirestore(app);
  const [messages, setMessages] = useState([]);
  const [outBox, setOutBox] = useState();
  const stopRender = useRef(true);
  const waitClient = useRef(false);
  const userId = useRef();
  const userName = useRef();
  const receiverId = useRef();
  const receiverName = useRef();

  //Check if Next is running on client side
  if (typeof window !== "undefined") {
    const localUserId = parseFloat(localStorage.getItem("userId"));
    receiverId.current = parseFloat(localStorage.getItem("currentChatId"));
    receiverName.current = localStorage.getItem("currentChatName");
    userId.current = localUserId;
    userName.current = localStorage.getItem("userName");
    waitClient.current = true;
  }

  if (stopRender.current && waitClient.current) {
    async function getMessages() {
      /*
      //getting current chat ID (recepient address)
      const chatActivityRef = doc(
        db,
        `users/${userId.current}/activity/chatActivity`
      );
      const chatDetails = await getDoc(chatActivityRef);
       const recepient = chatDetails.data().currentChatId;
      */

      //getting Messages
      const colRef = collection(
        db,
        `users/${userId.current}/inbox/${receiverId.current}/messages`
      );
      const msgs = await getDocs(colRef);
      const array = [];

      msgs.forEach((doc) => {
        array.push(doc.data());
      });
      setMessages([...array]);
      stopRender.current = false;
    }
    getMessages();
  }

  async function sendMessage() {
    const mul = 990199019901;
    const msgId = (Math.random() * Math.random() * mul).toFixed(0);

    /*
      //getting current chat ID (recepient address)
      const chatActivityRef = doc(
        db,
        `users/${userId.current}/activity/chatActivity`
      );
      const chatDetails = await getDoc(chatActivityRef);
      const recepient = chatDetails.data().currentChatId;
      const recpName = chatDetails.data().currentName;
      */

    //The message
    const outMsg = {
      message: outBox,
      messageId: msgId,
      createdAt: serverTimestamp(),
      sender: "james",
      recepient: receiverName,
      recepientId: receiverId,
      senderId: userId,
    };

    //add msg to sender and recepient buckets
    const recepientCol = collection(
      db,
      `users/${receiverId.current}/inbox/${userId.current}/messages`
    );
    const senderCol = collection(
      db,
      `users/${userId.current}/inbox/${receiverId.current}/messages`
    );
    addDoc(recepientCol, outMsg);
    addDoc(senderCol, outMsg);

    //adding Details

    const chatDet = {
      receiverId: receiverId.current,
      receiverName: receiverName.current,
      senderId: userId.current,
      senderName: userName.current,
      lastMessage: outBox,
      createdAt: serverTimestamp(),
    };

    const senderRef = doc(
      db,
      `users/${userId.current}/inbox/${receiverId.current}`
    );
    const receiverRef = doc(
      db,
      `users/${receiverId.current}/inbox/${userId.current}`
    );

    setDoc(senderRef, chatDet);
    setDoc(receiverRef, chatDet);

    //initiate
    setOutBox("");
    alert("Done");
  }

  return (
    <div className={style.main}>
      <div className={style.box}>
        {!stopRender.current &&
          messages.map((msg) => {
            return <Message key={msg.messageId} msg={msg} />;
          })}
      </div>
      <div className={style.input}>
        <input
          type="text"
          placeholder="Enter Message"
          onChange={(e) => {
            setOutBox(e.target.value);
          }}
        />
        <span onClick={(e) => sendMessage()}>Send</span>
      </div>
    </div>
  );
}

export default MessagePage;
