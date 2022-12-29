import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDLXJ84V8294qufI7A0XF1R51CXObffn4",
  authDomain: "amchat30-42963.firebaseapp.com",
  projectId: "amchat30-42963",
  storageBucket: "amchat30-42963.appspot.com",
  messagingSenderId: "241877795506",
  appId: "1:241877795506:web:1bf4fe08f63352ac327fab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
