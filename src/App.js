import { useEffect, useRef, useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./components/Auth";
import { uiActions } from "./store/uislice";
import Notification from "./components/Notification";
import OfflineDetector from "./components/OfflineDetector";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [currTitle, setCurTitle] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const valueRef = useRef();

  const { isAuthenticated } = useAuth0();

  // const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const notification = useSelector((state) => state.ui.notification);

  const options = {
    method: "POST",
    body: JSON.stringify({
      message: value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getMessages = async () => {
    valueRef.current.value = "";

    try {
      const response = await fetch(
        "https://messageai-api.onrender.com/completions",
        options
      );

      const data = await response.json();

      if (data.choices[0].message === undefined) {
        return;
      }

      setMessage(data.choices[0].message);
    } catch (err) {
      console.log("Error", err);
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Error sending message",
        })
      );
    }
  };

  useEffect(() => {
    if (!currTitle && value && message) {
      setCurTitle(value);
    }

    if (currTitle && value && message) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          title: currTitle,
          role: "user",
          content: value,
        },
        {
          title: currTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }

    // eslint-disable-next-line
  }, [message, currTitle]);

  const createNewChat = () => {
    setMessage(null);
    setCurTitle(null);
    setValue("");
  };

  const currChat = prevChats.filter((prevChat) => prevChat.title === currTitle);
  const uniqueTitle = Array.from(
    new Set(prevChats.map((prevChat) => prevChat.title))
  );

  const handleClick = (uniqueTitle) => {
    setCurTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className={`flex ${!isAuthenticated ? "flex-col" : ""}`}>
      <div className="hidden">
        <OfflineDetector />
      </div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          content={notification.message}
        />
      )}
      {!isAuthenticated && <Auth />}

      {isAuthenticated && (
        <Sidebar
          createNewChat={createNewChat}
          history={uniqueTitle}
          click={handleClick}
          open={isOpen}
          close={closeSidebar}
        />
      )}
      {isAuthenticated && (
        <Main
          getMessages={getMessages}
          value={valueRef}
          valueHandler={setValue}
          currTitle={currTitle}
          currChat={currChat}
          openSidebar={openSidebar}
          open={isOpen}
        />
      )}
    </div>
  );
}

export default App;
