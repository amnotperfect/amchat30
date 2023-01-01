import style from "../styles/inbox.module.css";
import { app } from "./Firebase";
import {
  collection,
  getFirestore,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useRef } from "react";

function InboxCont({ chat, toggleDisplay }) {
  const stopRender = useRef(true);
  const user = useRef();
  const checkUser = useRef(false);
  const waitClient = useRef(false);

  if (typeof window !== "undefined") {
    user.current = parseFloat(localStorage.getItem("userId"));
    waitClient.current = true;
    //Determin name to display

    if (chat.senderId === user.current) {
      checkUser.current = true;
    }
  }

  if (stopRender.current && waitClient.current) {
    const db = getFirestore(app);

    function setChat() {
      if (typeof window !== "undefined") {
        if (user.current === chat.receiverId) {
          localStorage.setItem("currentChatId", chat.senderId);
          localStorage.setItem("currentChatName", chat.senderName);
        } else {
          localStorage.setItem("currentChatId", chat.receiverId);
          localStorage.setItem("currentChatName", chat.receiverName);
        }
      }
    }

    return (
      <div
        className={style.inboxCont}
        onClick={(e) => {
          setChat(chat), toggleDisplay();
        }}
      >
        {checkUser.current ? (
          <p>{chat.receiverName}</p>
        ) : (
          <p>{chat.senderName}</p>
        )}
        <p>{chat.lastMessage}</p>
      </div>
    );
  }
}

export default InboxCont;
