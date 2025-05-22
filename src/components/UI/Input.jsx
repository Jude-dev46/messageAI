import React from "react";

const Input = ({ label, placeholder, type, value, isValid }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <p className={`${isValid ? "text-red" : "text-white"} self-start lg:ml-32 text-xl mb-2`}>
        {label}
      </p>
      <input
        type={type}
        name="My input"
        placeholder={placeholder}
        className={`bg-dark w-full lg:w-2/3 h-10 p-2 border-2 border-white rounded-md text-base text-slate-950 lg:h-10`}
        ref={value}
      />
    </div>
  );
};

export default Input;
