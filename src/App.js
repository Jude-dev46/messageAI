import { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/uislice";
import { authActions } from "./store/auth";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Auth from "./components/Auth";
import Notification from "./components/Notification";
import OfflineDetector from "./components/OfflineDetector";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [currTitle, setCurTitle] = useState(null);
  const [errorDispatched, setErrorDispatched] = useState(false);
  const valueRef = useRef();

  const notification = useSelector((state) => state.ui.notification);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOpen = useSelector((state) => state.ui.isOpen);
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);

  const getMessages = async () => {
    valueRef.current.value = "";
    const accessToken = localStorage.getItem("token");

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "https://messageai-api.onrender.com/completions",
        options
      );

      const data = await response.json();

      if (data.status === 403) {
        dispatch(uiActions.setIsModalOpen(true));
        return;
      }

      if (!data.choices) {
        if (!errorDispatched) {
          dispatch(
            uiActions.setNotification({
              status: "error",
              title: "Error!",
              message: "Error sending message",
            })
          );
          setErrorDispatched(true);
        }
        return;
      }

      setMessage(data.choices[0].message);
    } catch (err) {
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
    const accessToken = localStorage.getItem("token");

    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get("auth");
    const dataParam = urlParams.get("data");

    if (accessToken && authParam !== "failed") {
      const tokenData = JSON.parse(atob(accessToken.split(".")[1]));
      const expirationTimeInSeconds = tokenData.exp;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      if (currentTimeInSeconds > expirationTimeInSeconds) {
        dispatch(authActions.logOut());
      } else {
        dispatch(authActions.login());
      }
    } else {
      if (dataParam !== null) {
        localStorage.setItem("token", dataParam);
        dispatch(authActions.login());
      } else {
        dispatch(authActions.logOut());
      }
    }
  }, [dispatch]);

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
    dispatch(uiActions.setIsOpen(true));
  };

  const closeSidebar = () => {
    dispatch(uiActions.setIsOpen(false));
  };

  const closeModalHandler = () => {
    dispatch(uiActions.setIsModalOpen(false));
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
      {isModalOpen && <Modal closeModal={closeModalHandler} />}
    </div>
  );
}

export default App;
