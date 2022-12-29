import style from "../styles/chat.module.css";
import Inbox from "../Components/Inbox";
import MessagePage from "../Components/MessagePage";

function Chat() {
  return (
    <div className={style.chat}>
      <Inbox />
      <MessagePage />
    </div>
  );
}

export default Chat;
