import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <div
      className={`bg-slate-800 w-full lg:w-2/3 h-14 flex justify-center items-center rounded-md hover:cursor-pointer hover:bg-slate-950`}
      onClick={onClick}
    >
      <p className="text-white text-base">{children}</p>
    </div>
  );
};

export default Button;
