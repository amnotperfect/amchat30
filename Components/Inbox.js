import style from "../styles/inbox.module.css";
import Link from "next/link";
//Components
import AddChat from "../Components/AddChat";
import InboxCont from "../Components/InboxCont";
//Other
import { useState, useRef } from "react";
//Firebase
import { app } from "./Firebase";
import { getFirestore, getDocs, doc, collection } from "firebase/firestore";

function Inbox() {
  const [toggle, setToggle] = useState(true);
  const stopRender = useRef(true);
  const db = getFirestore(app);
  const [chats, setChats] = useState([]);
  const waitClient = useRef(false);
  const [displayInbox, setDisplayInbox] = useState(true);

  const userId = useRef();

  if (typeof window !== "undefined") {
    userId.current = localStorage.getItem("userId");
    waitClient.current = true;
  }

  if (stopRender.current && waitClient) {
    const inboxRef = collection(db, `users/${userId.current}/inbox`);
    async function getChat() {
      const array = [];
      const chats = await getDocs(inboxRef);

      chats.forEach((doc) => {
        array.push(doc.data());
        setChats([...array]);
      });

      stopRender.current = false;
    }

    getChat();
  }

  //toggle display of inbox on mobile view when width is < 500
  function toggleDisplay() {
    if (typeof window !== undefined && window.innerWidth < 500) {
      setDisplayInbox(!displayInbox);
    }
  }

  return (
    <div className={displayInbox ? style.main : { dislay: "none" }}>
      <header>
        <h2>amchat</h2>
        <p>Chris </p>
      </header>
      {toggle && (
        <div className={style.currentChats}>
          {!stopRender.current &&
            chats.map((chat) => {
              return (
                <InboxCont
                  key={Math.random()}
                  chat={chat}
                  toggleDisplay={toggleDisplay}
                />
              );
            })}
        </div>
      )}

      {!toggle && <AddChat toggleDisplay={toggleDisplay} />}

      <div className={style.bottom}>
        <button onClick={(e) => setToggle(!toggle)}>Add Chat</button>
        <button>
          <Link href="/join">Join</Link>
        </button>
      </div>
    </div>
  );
}

export default Inbox;
