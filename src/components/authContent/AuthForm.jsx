import React, { useRef } from "react";

import Input from "../UI/Input";
import Button from "../UI/Button";

const AuthForm = ({ isLogin, onsubmit }) => {
  const userInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const conPasswordInputRef = useRef();

  function submitInputHandler() {
    const inputs = {
      username: userInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      confirmPassword: conPasswordInputRef.current.value,
    };

    if (
      inputs.username === "" ||
      !inputs.email.includes("@") ||
      !inputs.password.length > 6 ||
      !inputs.confirmPassword.length > 6
    ) {
      alert("Invalid inputs!!!");
    }

    onsubmit(inputs);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 mb-5">
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
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={conPasswordInputRef}
        />
      </div>
      <Button onClick={submitInputHandler}>
        {isLogin ? "Log in" : "Sign Up"}
      </Button>
      <div>
        <p>
          Already registered?{" "}
          <span
            className="text-blue-700 cursor-pointer hover:text-blue-500"
            onClick={() => console.log("Hi")}
          >
            Login instead
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
