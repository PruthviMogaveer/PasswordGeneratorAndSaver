import React, { useId, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import usePassword from "../contexts/Password";

const SavedPassword = ({ password }) => {
  const savedPassId = useId();

  const passRef = useRef(null);

  const { delPass } = usePassword();

  const copyPass = () => {
    navigator.clipboard.writeText(password);
    passRef.current.select();
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="relative">
          <input
            type="text"
            name="savedPassword"
            id={savedPassId}
            readOnly
            ref={passRef}
            className="outline-none h-7 w-[26.5rem] max-md:w-52 max-sm:w-40 rounded-md p-5 text-gray-800 "
            value={password}
          />
        </div>
        <div
          className="absolute right-24 cursor-pointer text-gray-900 active:scale-75 transition-all duration-150"
          onClick={copyPass}
        >
          <FileCopyIcon />
        </div>
        <div
          className="absolute right-14 cursor-pointer text-gray-900 active:scale-75 transition-all duration-150"
          onClick={() => delPass(password)}
        >
          <DeleteIcon />
        </div>
      </div>
    </>
  );
};

export default SavedPassword;
