import { constants } from "buffer";
import { useRef, useState } from "react";
import style from "../styles/messagePage.module.css";

function Message({ msg }) {
  const userId = useRef();
  const check = useRef(true);

  const checkWindow = typeof window !== undefined;

  if (typeof window !== undefined) {
    userId.current = parseFloat(localStorage.getItem("userId"));
    check.current = userId.current === msg.senderId.current;
  }

  return (
    <div className={!check ? style.msgCont : style.msgContRight}>
      <span>{msg.senderName}</span>
      <p>{msg.message}</p>
    </div>
  );
}

export default Message;
