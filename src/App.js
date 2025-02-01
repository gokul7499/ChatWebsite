import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBox from "./pages/ChatBox/ChatBox";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import { auth } from "./firebase";
import { ThreeCircles } from "react-loader-spinner";

function App() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <div className={styles.App}>
      {loading ? (
        <div className={styles.loadcontainer}>
          <ThreeCircles
            height="50"
            width="50"
            color="#046cf1"
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/chatbox" element={<ChatBox name={userName} />} />
            <Route path="/ChatWebsite" element={<ChatBox name={userName} />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
