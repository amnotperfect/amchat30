import Head from "next/head";
import Join from "./join";
import Chat from "./chat";
import { useEffect, useRef } from "react";

export default function Index() {
  const toggle = useRef(false);

  //Toggle join page
  if (typeof window !== "undefined") {
    if (localStorage.getItem("userId") === null) {
      toggle.current = true;
    }
  }

  return (
    <main>
      <Chat />
      <Join display={toggle.current} />
    </main>
  );
}