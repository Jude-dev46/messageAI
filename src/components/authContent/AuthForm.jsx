import React, { useRef } from "react";
import Swal from "sweetalert2";

import Input from "../UI/Input";
import Button from "../UI/Button";

const AuthForm = ({ isLogin, onSignup, onlogin, setLogin }) => {
  const userInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const conPasswordInputRef = useRef();

  function submitInputHandler() {
    const inputs = {
      username: userInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      confirmPassword: conPasswordInputRef.current?.value,
    };

    const emailIsValid =
      inputs.email.includes("@") && inputs.email.trim().length > 0;
    const usernameIsValid =
      inputs.username !== "" && inputs.username.trim().length > 0;
    const passwordIsValid = inputs.password.trim().length > 6;
    const confirmPasswordIsValid = inputs.confirmPassword?.trim().length > 6;

    const passwordIsMatch = inputs.password === inputs.confirmPassword;

    if (isLogin) {
      if (!emailIsValid || !usernameIsValid || !passwordIsValid) {
        Swal.fire({title: "Error!", text: "Invalid inputs!", icon: "error", confirmButtonText: "OK", timer: 2000});
      } else {
        const inputObj = {
          email: inputs.email,
          username: inputs.username,
          password: inputs.password,
        };
        onlogin(inputObj);
      }
    } else {
      if (
        !emailIsValid ||
        !usernameIsValid ||
        !passwordIsValid ||
        !confirmPasswordIsValid ||
        !passwordIsMatch
      ) {
        Swal.fire({title: "Error!", text: "Invalid inputs!", icon: "error", confirmButtonText: "OK", timer: 2000});
      } else {
        onSignup(inputs);
      }
    }

    userInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    inputs.confirmPassword = "";
  }

  function authStateHandler() {
    setLogin(!isLogin);
  }

  async function googleAuthHandler() {
    window.location.href = "https://messageai-api.onrender.com/auth/google";
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:w-4/5 flex flex-col items-center gap-6 mb-5">
        {isLogin && (
          <Button onClick={googleAuthHandler} isStyle={true}>
            Login with google
          </Button>
        )}
        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={userInputRef}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your valid email address"
          value={emailInputRef}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={passwordInputRef}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={conPasswordInputRef}
          />
        )}
      </div>
      <div className="w-full lg:w-4/5 flex justify-center">
      <Button onClick={submitInputHandler}>
        {isLogin ? "Log in" : "Sign Up"}
      </Button>
      </div>
      <div className="mt-2">
        <p>
          Already registered?{" "}
          <span
            className="text-blue-700 cursor-pointer hover:text-blue-500"
            onClick={authStateHandler}
          >
            {!isLogin ? "Login instead" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
