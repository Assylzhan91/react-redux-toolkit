import { useEffect, useState } from "react";

import { Button } from "./components/Button/Button.tsx";
import "./App.css";
import { JournalForm } from "./components/JournalForm/JournalForm.tsx";

function App() {
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerKey((prevKey) => prevKey + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>header</header>
      <main>
        main{timerKey}
        <Button key={timerKey} onClick={() => console.log("asdas")} text="button"></Button>
        <JournalForm></JournalForm>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
