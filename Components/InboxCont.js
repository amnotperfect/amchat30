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

function InboxCont({ chat }) {
  const stopRender = useRef(true);
  const user = useRef();
  const checkUser = useRef(false);
  const waitClient = useRef(false);

  if (typeof window !== "undefined") {
    user.current = parseFloat(localStorage.getItem("userId"));
    waitClient.current = true;
    if ((chat.senderId = user.current)) {
      checkUser.current = true;
    }
  }

  if (stopRender.current && waitClient.current) {
    const db = getFirestore(app);

    //Adding info to firebase

    function setChat() {
      /*
      const chatActivityRef = doc(
        db,
        `users/${user.current}/activity/chatActivity`
      );
      const activity = {
        currentChatId: chat.chatId,
        currentChatName: chat.name,
      };

      setDoc(chatActivityRef, activity);
      */

      //Adding Info to the localStorage

      if (typeof window !== "undefined") {
        localStorage.setItem("currentChatId", chat.receiverId);
        localStorage.setItem("currentChatName", chat.receiverName);
      }
    }

    return (
      <div className={style.inboxCont} onClick={(e) => setChat(chat)}>
        {checkUser.current ? (
          <p>{chat.senderName}</p>
        ) : (
          <p>{chat.receiverName}</p>
        )}
        <p>{chat.lastMessage}</p>
      </div>
    );
  }
}

export default InboxCont;
