import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = ({ createNewChat, history, click, open, close }) => {
  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } bg-slate-950 text-white h-screen min-h-screen w-3/4 md:w-2/4 lg:w-1/4 lg:flex flex-col justify-between items-center z-10 ${
        open ? "absolute" : ""
      }`}
    >
      <div className="relative w-11/12 flex justify-center items-center">
        <button
          onClick={createNewChat}
          className="w-3/4 border rounded-md px-18 py-2 mt-3"
        >
          New Chat +
        </button>
        <div className="absolute left-72 md:left-96 lg:hidden" onClick={close}>
          <AiOutlineClose size={32} color="#020617" />
        </div>
      </div>
      <ul className="w-3/4 flex-grow m-2 p-2 overflow-y-scroll hide-scroll">
        {history?.map((history, index) => (
          <li
            className="mb-2 py-2 list-none cursor-pointer flex items-center gap-3"
            key={index}
            onClick={() => click(history)}
          >
            <AiOutlineMessage size={24} color="white" />
            {history}
          </li>
        ))}
      </ul>
      <footer className="w-3/4 pt-2 mb-5 border-t-2 text-center">
        <p>&copy; Jude Olajumoke</p>
      </footer>
    </div>
  );
};

export default Sidebar;
