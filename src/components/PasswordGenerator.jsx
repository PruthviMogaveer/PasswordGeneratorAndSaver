import { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useId } from "react";

function PasswordGenerator() {
  const numberId = useId();
  const lengthId = useId();
  const charId = useId();

  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);

  const [pass, setPass] = useState("");

  const passGenInputRef = useRef(null)

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
  }, [length, isNumber, isChar]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pass)
    passGenInputRef.current.select()
  }

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
            className="outline-none h-7 w-96 max-md:w-52 max-sm:w-28 rounded-l-md p-5 text-gray-800"
            value={pass}
            ref={passGenInputRef}
          />
          <button
            className="bg-blue-800 rounded-r-md w-1/4 text-white hover:bg-blue-700 active:scale-95 max-md:p-2"
            onClick={copyToClipboard}
          >
            COPY
          </button>
        </div>
        <div className="flex justify-between items-center max-md:w-52 max-md:justify-evenly max-md:ml-4  max-sm:w-28 flex-wrap">
          <div className="flex items-center justify-between space-x-2">
            <input
              type="range"
              name="length"
              id={lengthId}
              value={length}
              className=""
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
              onChange={() => setIsNumber((prev) => !prev)}
            />
            <label htmlFor={numberId} className="text-slate-200">
              Number
            </label>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <input
              type="checkbox"
              name="character"
              id={charId}
              onChange={() => setIsChar((prev) => !prev)}
            />
            <label htmlFor={charId} className="text-slate-200">
              Charecter
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
