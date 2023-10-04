import { createContext, useContext, useState } from "react";

export const PasswordContext = createContext();

export const PasswordContextProvider = ({ children }) => {
  const [pass, setPass] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);

  const savePassword = () => {
    setSavedPasswords([...savedPasswords, pass]);
  };

  const delPass = (password) => {
    setSavedPasswords(() =>
      savedPasswords.filter((savedPassword) => password !== savedPassword)
    );
  };

  return (
    <PasswordContext.Provider
      value={{ pass, setPass, savedPasswords, savePassword, delPass }}
    >
      {children}
    </PasswordContext.Provider>
  );
};

export default function usePassword() {
  return useContext(PasswordContext);
}
