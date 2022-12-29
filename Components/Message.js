import { constants } from "buffer";
import { useRef, useState } from "react";
import style from "../styles/messagePage.module.css";

function Message({ msg }) {
  const userId = useRef();
  const check = useRef(true);

  const checkWindow = typeof window !== undefined;

  if (typeof window !== undefined) {
    userId.current = parseFloat(localStorage.getItem("userId"));
    check.current = parseFloat(userId.current) === parseFloat(msg.senderId);
  }

  return (
    <div className={check && checkWindow ? style.msgCont : style.msgContRight}>
      <p>{msg.senderName}</p>
      <p>{msg.message}</p>
      <p>{msg.messageId}</p>
    </div>
  );
}

export default Message;
