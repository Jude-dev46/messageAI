import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

import { authActions } from "../store/auth";
import { uiActions } from "../store/uislice";
import AuthForm from "./authContent/AuthForm";
import Robot from "../assets/robot.png";
import Modal from "./Modal";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.ui.isLoading);

  const signUpHandler = async (inputs) => {
    dispatch(uiActions.setIsLoading(true));

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch(
        "https://messageai-api.onrender.com/auth/signUp",
        options
      );

      const data = await response.json();
      console.log(data);
      dispatch(uiActions.setIsLoading(false));

      if (data.status) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
      dispatch(uiActions.setIsLoading(false));
    }
  };

  const loginHandler = async (inputs) => {
    dispatch(uiActions.setIsLoading(true));
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch(
        "https://messageai-api.onrender.com/auth/login",
        options
      );

      const data = await response.json();
      dispatch(uiActions.setIsLoading(false));

      if (data.status) {
        dispatch(authActions.login());
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      dispatch(uiActions.setIsLoading(false));
    }
  };

  return (
    <section className="bg-slate-950 h-fit lg:h-screen w-full px-5 py-10 text-white md:mx-auto flex flex-col lg:flex-row items-center justify-center shadow-lg">
      <div className="w-full lg:w-1/2">
        <img src={Robot} alt="robot by kjpargeter on freepik" />
      </div>
      <div className="w-full lg:w-1/2">
        <div className="mb-5 text-3xl">
          {/* <p className=""> */}
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Hello👋, Welcome to your friendly AI Chatbot!")
                .pauseFor(1000)
                .deleteAll()
                .typeString("MessageAI, human language model")
                .start();
            }}
          />
          {/* </p> */}
          <p className="text-base">Sign up/Login to ask me anything</p>
        </div>
        <AuthForm
          onSignup={signUpHandler}
          onlogin={loginHandler}
          isLogin={isLogin}
          setLogin={setIsLogin}
        />
        {isLoading && <Modal />}
      </div>
    </section>
  );
};

export default Auth;
