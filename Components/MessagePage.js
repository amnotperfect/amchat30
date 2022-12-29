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
    const checkuserId = localStorage.getItem("userId") !== null;
    const checkReceiverId = localStorage.getItem("currentChatId") !== null;

    if (
      outBox !== "" &&
      outBox !== undefined &&
      checkuserId &&
      checkReceiverId
    ) {
      const mul = 990199019901;
      const msgId = (Math.random() * Math.random() * mul).toFixed(0);

      //The message
      const outMsg = {
        message: outBox,
        messageId: msgId,
        createdAt: serverTimestamp(),
        senderName: userName.current,
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
    } else {
      //Alerts of errors
      outBox === "" && alert("Oops! seem like there is no meesage");
      outBox === undefined && alert("Oops! seem like there is no meesage");
      !checkuserId && alert("Please log in to amchat");
      !checkReceiverId && alert("Please select a chat");
    }
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
          value={outBox}
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
