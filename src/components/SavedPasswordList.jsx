import { SavedPassword } from ".";
import usePassword from "../contexts/Password";

function SavedPasswordList() {
  const { savedPasswords } = usePassword(); //Using the usePassword context

  return (
    <>
      {savedPasswords.length != 0 && (
        <div className="flex flex-col justify-center bg-white bg-opacity-10 p-10 w-full space-y-4 flex-wrap ">
          {savedPasswords.map((savedPassword) => (
            <SavedPassword password={savedPassword} key={savedPassword.key} />
          ))}
        </div>
      )}
    </>
  );
}

export default SavedPasswordList;
