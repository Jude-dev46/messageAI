import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typewriter from "typewriter-effect";

import { authActions } from "../store/auth";
import { uiActions } from "../store/uislice";
import AuthForm from "./authContent/AuthForm";
import Swal from "sweetalert2";
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
      } else {
        Swal.fire({title: "Error!", text: data.message, icon: "error", confirmButtonText: "OK"});
        throw Error(data.message);
      }
    } catch (error) {
      Swal.fire({title: "Error!", text: error.message, icon: "error", confirmButtonText: "OK"});
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
      } else {
        Swal.fire({title: "Error!", text: data.message, icon: "error", confirmButtonText: "OK"});
        throw Error(data.message);
      }
    } catch (error) {
      Swal.fire({title: "Error!", text: error.message, icon: "error", confirmButtonText: "OK"});
      dispatch(uiActions.setIsLoading(false));
    }
  };

  return (
    <section className="bg-slate-950 h-screen lg:h-screen w-full px-5 py-10 text-white flex items-center justify-center shadow-lg">
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="mb-5 text-3xl">
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
