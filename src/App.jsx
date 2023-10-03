import { PasswordGenerator, SavedPasswordList } from "./components";

function App() {

 return (
    <>
      <main className="bg-slate-900 min-h-screen w-full flex flex-col flex-wrap items-center justify-center">
        <section><PasswordGenerator /></section>
        <section><SavedPasswordList /></section>
      </main>
    </>
  );
}

export default App
