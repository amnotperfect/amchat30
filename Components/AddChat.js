import style from "../styles/inbox.module.css";
import { useRef, useState } from "react";
//firebase
import { app } from "./Firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";

function UserCont({ user }) {
  function setChat() {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentChatId", user.userId);
      localStorage.setItem("currentChatName", user.name);
    }
  }
  return (
    <div
      className={style.userCont}
      onClick={(e) => {
        setChat();
      }}
    >
      <span>{user.name}</span>
    </div>
  );
}

export default function AddChat() {
  //controllers
  const waitClient = useRef(false);
  const stopRender = useRef(true);
  //Firebase
  const db = getFirestore(app);
  //stores
  const userId = useRef();
  const [user, setUser] = useState();

  if (typeof window !== "undefined") {
    userId.current = localStorage.getItem("userId");
    waitClient.current = true;
  }

  if (stopRender.current && waitClient.current) {
    async function search() {
      const array = [];
      //getUsers
      const usersRef = collection(db, `users`);
      const data = await getDocs(usersRef);
      //Generate searchId
      const searchId = parseFloat(((input * 9901) / 1099) * 4002).toFixed(0);

      //Indentify the search
      data.forEach((a) => {
        if (a.data().userId === parseFloat(searchId)) {
          array.push(a.data());
          setUser([...array]);
        }
      });
    }

    const [input, setInput] = useState();
    return (
      <div className={style.addChatPage}>
        <header>
          <input type="number" onChange={(e) => setInput(e.target.value)} />
          <span onClick={(e) => search()}>search</span>
        </header>
        <section>
          {user !== undefined &&
            user.map((a) => {
              return <UserCont key={Math.random} user={a} />;
            })}
        </section>
      </div>
    );
  }
}
