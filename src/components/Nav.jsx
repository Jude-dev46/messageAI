import { AiOutlineMenu } from "react-icons/ai";

const Nav = ({ openSidebar }) => {
  return (
    <div className="w-1/2 h-[10vh] flex items-center justify-items-start lg:justify-center gap-10 md:gap-40 mb-2">
      <div className="mt-1 lg:hidden" onClick={() => openSidebar()}>
        <AiOutlineMenu size={24} color="#020617" />
      </div>
      <h1 className="font-sans text-xl text-slate-950 mt-1">MessageAI</h1>
    </div>
  );
};

export default Nav;
