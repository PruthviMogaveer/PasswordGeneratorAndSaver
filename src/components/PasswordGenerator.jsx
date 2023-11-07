import { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useId } from "react";
import usePassword from "../contexts/Password";
import { red } from "@mui/material/colors";

function PasswordGenerator() {
  const numberId = useId();
  const lengthId = useId();
  const charId = useId();

  const [length, setLength] = useState(8); //Length of the password
  const [isNumber, setIsNumber] = useState(false); //Number is unabled or not
  const [isChar, setIsChar] = useState(false); //Character is unabled or not

  // Using the usePassword context
  const { pass, setPass, savePassword, savedPasswords, key, setKey } =
    usePassword();

  useEffect(
    () => localStorage.setItem("passwords", JSON.stringify(savedPasswords)),
    [savedPasswords]
  ); //Storing the saved passwords in local storage

  const passGenInputRef = useRef(null); //useref for the password input box
  const passKeyRef = useRef(null); //useref for the key input box

  //To generate the passsword using useCallback hook
  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) str += "0123456789";
    if (isChar) str += "!@#$%^&*()-_+=?|{}[].,?`~";

    for (let i = 1; i <= length; i++) {
      let passCharNum = Math.floor(Math.random() * str.length);
      let passChar = str.charAt(passCharNum);
      password += passChar;
    }
    return password;
  }, [length, isNumber, isChar, setPass]);

  useEffect(() => {
    setPass(passwordGenerator);
  }, [length, isNumber, isChar]); //Updating the password each time it is generated

  // Password copy function for copy btn
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pass);
    passGenInputRef.current.select();
  };

  //To handle the save btn click
  const handleSave = () => {
    if (key !== "") {
      savePassword();
      setKey("");
      passKeyRef.current.classList.remove(
        "placeholder-red-600",
        "border",
        "border-red-600"
      );
      passKeyRef.current.classList.add("placeholder-slate-600");
    } else {
      passKeyRef.current.classList.remove("placeholder-slate-600");
      passKeyRef.current.classList.add(
        "placeholder-red-600",
        "border",
        "border-red-600"
      );
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center bg-white rounded-lg bg-opacity-10 p-10 w-full space-y-4 flex-wrap">
        <div className="flex">
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Get your password here"
            readOnly
            className="outline-none h-7 w-96 max-md:w-52 max-sm:w-40 rounded-l-md p-5 text-gray-800"
            value={pass}
            ref={passGenInputRef}
          />
          <button
            className="bg-blue-800 rounded-r-md w-1/4 text-white hover:bg-blue-700 active:scale-95 max-md:p-2 transition-all duration-150"
            onClick={copyToClipboard}
          >
            COPY
          </button>
        </div>
        <div className="flex justify-between items-center max-md:w-52 max-md:justify-evenly max-md:ml-4 max-sm:w-28 max-sm:ml-12 flex-wrap">
          <div className="flex items-center justify-between space-x-2">
            <input
              type="range"
              name="length"
              id={lengthId}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor={lengthId} className="text-slate-200">
              Length({length})
            </label>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <input
              type="checkbox"
              name="number"
              id={numberId}
              className="cursor-pointer"
              onChange={() => setIsNumber((prev) => !prev)}
            />
            <label htmlFor={numberId} className="text-slate-200 cursor-pointer">
              Number
            </label>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <input
              type="checkbox"
              name="character"
              id={charId}
              className="cursor-pointer"
              onChange={() => setIsChar((prev) => !prev)}
            />
            <label htmlFor={charId} className="text-slate-200 cursor-pointer">
              Charecter
            </label>
          </div>
        </div>

        <input
          type="text"
          name="Key"
          id="Key"
          placeholder="Enter the key for password"
          className="outline-none h-0 w-full mb-3 max-md:w-72 max-sm:w-56 rounded-md p-5 text-gray-800 placeholder-slate-600"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            passKeyRef.current.classList.remove(
              "placeholder-red-600",
              "border",
              "border-red-600"
            );
          }}
          ref={passKeyRef}
        />
        <button
          className="bg-green-700 w-full h-9 rounded-md hover:bg-green-600 active:scale-95 transition-all duration-150 max-md:w-72 max-sm:w-56"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>
    </>
  );
}

export default PasswordGenerator;
