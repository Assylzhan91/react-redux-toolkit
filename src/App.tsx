import { useEffect, useState } from "react";

import { Button } from "./components/Button/Button.tsx";
import "./App.css";
import { JournalForm } from "./components/JournalForm/JournalForm.tsx";
import type { IFormData } from "./models/data-interface.ts";

function App() {
  const [timerKey, setTimerKey] = useState(0);
  const [reset, setReset] = useState(0);
  const [journalList, setJournalList] = useState<IFormData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerKey((prevKey) => prevKey + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function handleDataForm(form: IFormData): void {
    setReset((value) => value + 1);
    setJournalList((prevState) => [...prevState, form]);
  }

  return (
    <>
      <header>
        <ul>
          {journalList.map((form: IFormData, idx: number) => (
            <li key={idx}>
              <div>{form.title}</div>
            </li>
          ))}
        </ul>
      </header>
      <main>
        main{timerKey}
        <Button key={timerKey} onClick={() => console.log("asdas")} text="button"></Button>
        <JournalForm key={reset} outputCb={handleDataForm}></JournalForm>
      </main>
      ;<footer>footer</footer>;
    </>
  );
}

export default App;
