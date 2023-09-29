// import { useDispatch } from "react-redux";
import Typewriter from "typewriter-effect";

// import { authActions } from "../store/auth";
import AuthForm from "./authContent/AuthForm";
import Robot from "../assets/robot.png";

const Auth = () => {
  // const dispatch = useDispatch();

  const submitHandler = async (inputs) => {
    console.log(inputs);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const response = await fetch(
        "https://messageai-api.onrender.com/signUp",
        options
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    //   dispatch(authActions.login());
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
                  .typeString("Hello👋, Welcome to messageAI")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Your friendly AI chatbot!")
                  .start();
              }}
            />
          </p>
          <p className="text-base">Sign up/Login to ask me anything</p>
        </div>
        <AuthForm onsubmit={submitHandler} />
      </div>
    </section>
  );
};

export default Auth;
