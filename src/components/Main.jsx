import Nav from "./Nav";

const Main = ({ getMessages, value, currChat, open, openSidebar }) => {
  return (
    <div className="relative w-full h-[100svh] max-h-[100svh] flex flex-col justify-between items-center overflow-y">
      <Nav open={open} openSidebar={openSidebar} />
      <ul className="w-full h-full mt-3 overflow-y-scroll hide-scroll -mb-3">
        {currChat?.map((currMessage, index) => (
          <li
            key={index}
            className={`${
              currMessage.role === "user" ? "bg-white" : "bg-slate-950"
            } flex items-center gap-8 p-5 pl-5 md:pl-20 ${
              currMessage.role === "user" ? "text-slate-950" : "text-white"
            }`}
          >
            <p
              className={`border p-2 px-4 rounded-full ${
                currMessage.role === "user" ? "bg-slate-950" : "bg-white"
              } ${
                currMessage.role === "user" ? "text-white" : "text-slate-950"
              }`}
            >
              {currMessage.role.charAt(0).toUpperCase()}
            </p>
            <p className="w-full">{currMessage.content}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center w-full mb-1">
        <div className="relative w-fit flex justify-center mb-2">
          <textarea
            placeholder="Send a message..."
            type="text"
            className="w-[300px]
            md:w-[600px] h-fit mt-1 block px-3 py-2 bg-white border border-r-slate-950
            rounded-md placeholder-slate-950 shadow-lg"
            ref={value}
          ></textarea>
          <button
            onClick={getMessages}
            className="bg-slate-950 absolute right-2 lg:right-0 bottom-2 lg:mr-3 px-1 rounded-md text-white"
          >
            &#10146;
          </button>
        </div>
        <p className="text-sm text-center mx-2">
          Free Research Preview. MessageAI is an AI chat web-app built with the
          OpenAI API. Checkout ChatGPT May 12 Version
        </p>
      </div>
    </div>
  );
};

export default Main;
