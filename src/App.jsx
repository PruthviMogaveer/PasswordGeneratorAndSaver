import { PasswordGenerator, SavedPasswordList } from "./components";
import usePassword, { PasswordContextProvider } from "./contexts/Password";

function App() {
  return (
    // Binding with the PasswordContextProvider context
    <PasswordContextProvider>
      <main className="bg-slate-900 min-h-screen w-full flex flex-col flex-wrap items-center justify-center relative">
        <section className="mb-5 absolute top-16">
          <PasswordGenerator />
        </section>
        <section className="mt-5 absolute top-72 max-md:top-80 max-sm:top-[22rem] max-h-80 no-scrollbar overflow-y-auto rounded-lg ">
          <SavedPasswordList />
        </section>
      </main>
    </PasswordContextProvider>
  );
}

export default App;
