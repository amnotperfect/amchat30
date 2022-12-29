import { constants } from "buffer";
import { useState } from "react";
import style from "../styles/messagePage.module.css";

function Message({ msg }) {
  const userId = 28372598652717;
  const check = userId === msg.senderId;

  return (
    <div className={check ? style.msgCont : style.msgContRight}>
      <span>{msg.sender}</span>
      <p>{msg.message}</p>
      <p>{msg.messageId}</p>
    </div>
  );
}

export default Message;
