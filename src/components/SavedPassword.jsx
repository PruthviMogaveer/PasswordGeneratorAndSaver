import React, { useId, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import usePassword from "../contexts/Password";

const SavedPassword = ({ password }) => {
  const savedPassId = useId(); //Unique id for each saved password box

  const passRef = useRef(null); //useRef for the saved password input box

  const { delPass } = usePassword(); //using the usePassword context

  // To copy the saved password
  const copyPass = () => {
    navigator.clipboard.writeText(password.pass);
    passRef.current.select();
  };

  return (
    <>
      <div className="flex max-sm:w-64 max-sm:left-[-1rem] max-md:w-80 max-md:left-[-1rem] justify-center items-center relative w-[26.5rem] h-10 bg-white rounded-md">
        <div className="absolute left-0 p-2">
          <input
            type="text"
            name="savedPassword"
            id={savedPassId}
            readOnly
            ref={passRef}
            className="outline-none  max-md:w-52 max-sm:w-40 p-5 text-gray-800 bg-transparent w-[21rem] relative z-10"
            value={password.pass}
          />
          <label
            htmlFor="savedPasswordId"
            className="absolute top-[0.71rem] px-4 z-0 bg-white rounded-md text-slate-600 text-sm left-5"
          >
            {password.key}
          </label>
        </div>
        <div className="flex absolute right-4 space-x-4 justify-around items-center">
          <button
            className=" cursor-pointer text-gray-900 active:scale-75 transition-all duration-150"
            onClick={copyPass}
          >
            <FileCopyIcon />
          </button>
          <button
            className=" cursor-pointer text-gray-900 active:scale-75 transition-all duration-150"
            onClick={() => delPass(password.key)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default SavedPassword;
