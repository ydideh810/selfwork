import React from "react";

const Button: React.FC<{
  buttonHandler?: any;
  children: string;
}> = ({ buttonHandler, children }) => {
  return (
    <button
      className="bg-gray-300  text-black text-[14px] px-3 tracking-wide py-1 rounded-[7px] hover:bg-gray-400"
      type="button"
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};

export default Button;