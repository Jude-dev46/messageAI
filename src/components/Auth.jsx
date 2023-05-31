import { useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Auth = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    let emailValue = emailInputRef.current.value;
    let passwordValue = passwordInputRef.current.value;

    console.log(emailValue, passwordValue);

    dispatch(authActions.login());
  };

  return (
    <section className="bg-slate-950 max-h-screen text-white mx-auto flex flex-col items-center md:mt-20 p-20">
      <div className="w-56 lg:w-full flex flex-col items-center -mt-5 mb-8">
        <h1 className="text-xl md:text-2xl font-sans">Welcome to MessageAI</h1>
        <p>Login to get started</p>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 border rounded-md p-10 -ml-3"
      >
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="Email" className="text-xl font-sans">
            Email
          </label>
          <input
            className="h-12 w-56 md:w-full rounded-md p-5 text-slate-950"
            type="email"
            placeholder="Enter your email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="Password" className="text-xl font-sans">
            Password
          </label>
          <input
            className="h-12 w-56 md:w-full rounded-md p-5 text-slate-950"
            type="password"
            placeholder="Enter your secret key"
            ref={passwordInputRef}
            required
          />
        </div>
        <button className="bg-white text-slate-950 px-5 py-2 rounded-md hover:bg-slate-800 hover:text-white">
          Login
        </button>
      </form>
    </section>
  );
};

export default Auth;
