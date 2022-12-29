import { useEffect, useState } from "react";
import style from "../styles/Join.module.css";
import { app } from "../Components/Firebase";
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore";

function Join({ display }) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [phone2, setPhone2] = useState();
  const [pin, setPin] = useState();
  const [pin2, setPin2] = useState();

  const [toggle, setToggle] = useState(true);

  function addDetails() {
    if (name !== "" && phone !== "" && pin !== "") {
      if (phone.length === 9 && phone === phone2 && pin === pin2) {
        //Generating Ids
        const userId = parseFloat(((phone * 9901) / 1099) * 4002).toFixed(0);
        const pin3 = parseFloat(((pin * 99) / 10) * 40).toFixed(0);

        //Adding to local Storage
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", name);

        //Database Ref
        const db = getFirestore(app);
        const userRef = doc(db, `users/${userId}`);

        //user details
        const userDet = {
          name: name,
          userId: userId,
          pin: pin3,
          createdAt: serverTimestamp(),
        };

        setDoc(userRef, userDet);
        alert("Thank you for join amchat30");
        alert("Reload Page To Get Started");

        return;
      }
    }

    alert("Confirm if details a entered Correctly");
  }

  function logIn() {
    if (phone !== "" && pin !== "") {
      const userId = parseFloat(((phone * 9901) / 1099) * 4002).toFixed(0);
      localStorage.setItem("userId", userId).toFixed(0);
      console.log(userId);
    }
  }

  console.log(display);
  console.log(typeof window);

  return (
    <div className={style.main}>
      {!toggle ? (
        <div className={style.signIn}>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="Number"
            placeholder="Phone 7_ _ _ _ _ _ _ _"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Confirm Phone Number"
            onChange={(e) => {
              setPhone2(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter Pin"
            onChange={(e) => {
              setPin(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm Pin"
            onChange={(e) => {
              setPin2(e.target.value);
            }}
          />
          <section>
            <button onClick={(e) => addDetails()}>Join</button>
            <span onClick={(e) => setToggle(!toggle)}>Log In</span>
          </section>
        </div>
      ) : (
        <div className={style.logIn}>
          <input
            type="number"
            placeholder="Enter Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter Pin"
            onChange={(e) => {
              setPin(e.target.value);
            }}
          />

          <section>
            <button
              onClick={(e) => {
                logIn();
              }}
            >
              Log In
            </button>
            <span onClick={(e) => setToggle(!toggle)}>Join</span>
          </section>
        </div>
      )}
    </div>
  );
}

export default Join;
