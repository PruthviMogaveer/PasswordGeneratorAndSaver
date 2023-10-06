import { createContext, useContext, useState } from "react";

// Creating the context
export const PasswordContext = createContext();

// context provider
export const PasswordContextProvider = ({ children }) => {
  // Getting the saved passwords from the local storage
  const getLocalData = () => {
    let localData = localStorage.getItem("passwords");
    if (localData === "") return [];
    else return JSON.parse(localData);
  };

  // Initial Passwords saved inside the local storage
  const initialSavedPasswords = getLocalData();

  const [pass, setPass] = useState(""); //Storage for generated password
  const [key, setKey] = useState(""); //Storing the key for password

  const [savedPasswords, setSavedPasswords] = useState(
    initialSavedPasswords || []
  ); //Storage for saved passwords

  let flag = false;
  // Saving the password in the useState variable
  const savePassword = () => {
    savedPasswords.map((p) => {
      p.key == key && (flag = true);
    });
    flag != true &&
      setSavedPasswords([...savedPasswords, { key: key, pass: pass }]);
  };

  // To delete the password from useState variable
  const delPass = (password) => {
    setSavedPasswords(() =>
      savedPasswords.filter((savedPassword) => password !== savedPassword.key)
    );
  };

  // returing the context provider
  return (
    <PasswordContext.Provider
      value={{
        pass,
        setPass,
        savedPasswords,
        savePassword,
        delPass,
        flag,
        key,
        setKey,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

// Custom hook which returns the PasswordContext
export default function usePassword() {
  return useContext(PasswordContext);
}
