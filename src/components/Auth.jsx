import { useState } from "react";
import { useDispatch } from "react-redux";
import Typewriter from "typewriter-effect";

import { authActions } from "../store/auth";
import AuthForm from "./authContent/AuthForm";
import Robot from "../assets/robot.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const signUpHandler = async (inputs) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch(
        "http://localhost:8001/auth/signUp",
        options
      );

      const data = await response.json();

      if (data.status) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (inputs) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch("http://localhost:8001/auth/login", options);

      const data = await response.json();

      if (data.status) {
        dispatch(authActions.login());
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-slate-950 h-fit lg:h-screen w-full px-5 py-10 text-white md:mx-auto flex flex-col lg:flex-row items-center justify-center shadow-lg">
      <div className="w-full lg:w-1/2">
        <img src={Robot} alt="robot by kjpargeter on freepik" />
      </div>
      <div className="w-full lg:w-1/2">
        <div className="mb-5">
          <p className="text-3xl">
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
          </p>
          <p className="text-base">Sign up/Login to ask me anything</p>
        </div>
        <AuthForm
          onSignup={signUpHandler}
          onlogin={loginHandler}
          isLogin={isLogin}
          setLogin={setIsLogin}
        />
      </div>
    </section>
  );
};

export default Auth;
