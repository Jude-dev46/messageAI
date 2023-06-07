import { AiOutlineMenu } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = ({ openSidebar }) => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="w-full h-8 flex md:gap-40 lg:-gap-20 items-center justify-evenly mb-2 -ml-18 md:-ml-38 lg:ml-0 lg:pl-80">
      <div className="mt-4 lg:hidden" onClick={() => openSidebar()}>
        <AiOutlineMenu size={24} color="#020617" />
      </div>
      <h1 className="font-sans text-xl text-slate-950 mt-3">MessageAI</h1>
      {isAuthenticated && (
        <img
          src={user.picture}
          alt={user.name}
          className="w-10 h-18 mt-4 rounded-full cursor-pointer"
        />
      )}
    </div>
  );
};

export default Nav;
