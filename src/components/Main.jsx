import Nav from "./Nav";

const Main = ({
  getMessages,
  value,
  valueHandler,
  currChat,
  open,
  openSidebar,
  online,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-between items-center">
      <Nav open={open} openSidebar={openSidebar} />
      <ul className="w-full h-full mt-3 overflow-y-scroll hide-scroll">
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
      <div className="relative flex justify-center w-full mb-3">
        <input
          placeholder="Send a message..."
          type="text"
          className="w-3/4 lg:w-2/4 mt-1 block px-3 py-2 bg-white border rounded-md shadow-sm placeholder-slate-950"
          value={value}
          onChange={(e) => {
            e.preventDefault();
            valueHandler(e.target.value);
          }}
        />
        <button
          onClick={getMessages}
          className="absolute right-16 bottom-2 md:right-32 lg:right-80 lg:mr-3"
          // disabled={!online}
        >
          &#10146;
        </button>
      </div>
      <p className="mb-5 text-center mx-2">
        Free Research Preview. MessageAI is an AI chat app built with the OpenAI
        API. Checkout ChatGPT May 12 Version
      </p>
    </div>
  );
};

export default Main;
