import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useAuth0 } from "@auth0/auth0-react";

const Auth = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect, isLoading } = useAuth0();

  const submitHandler = (e) => {
    e.preventDefault();

    loginWithRedirect();

    dispatch(authActions.login());
  };

  return (
    <section className="bg-slate-950 max-h-screen text-white md:mx-auto flex flex-col items-center m-4 mt-24 md:mt-20 p-16 rounded-lg shadow-lg">
      <div className="w-56 md:w-72 lg:w-full flex flex-col items-center -mt-5 mb-8">
        <h1 className="text-xl md:text-2xl font-sans">Welcome to messageAI</h1>
        <p>{isLoading ? "Logging you in" : "Login to get started"}</p>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 border rounded-md px-10 py-6"
      >
        <button
          className={`bg-white text-slate-950 px-8 py-2 rounded-md hover:bg-slate-800 hover:text-white ${
            isLoading ? "disabled" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Auth;
