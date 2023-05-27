import { AiOutlineMenu } from "react-icons/ai";

const Nav = ({ openSidebar }) => {
  return (
    <div className="w-full flex items-center justify-evenly -ml-14 md:-ml-40 lg:ml-0">
      <div className="mt-4 lg:hidden" onClick={() => openSidebar()}>
        <AiOutlineMenu size={24} color="#020617" />
      </div>
      <h1 className="font-sans text-2xl text-slate-950 mt-3">MessageAI</h1>
    </div>
  );
};

export default Nav;
