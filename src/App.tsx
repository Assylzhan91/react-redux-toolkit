import { type JSX, useEffect, useState } from "react";

import { Button } from "./components/Button/Button.tsx";
import "./App.css";
import { JournalForm } from "./components/JournalForm/JournalForm.tsx";
import type { IFormData } from "./models/data-interface.ts";

function App() {
  const [timerKey, setTimerKey] = useState(0);
  const [reset, setReset] = useState(Math.random);
  const [journalList, setJournalList] = useState<IFormData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerKey((prevKey) => prevKey + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function handleDataForm(form: IFormData): void {
    setReset(Math.random());
    setJournalList((prevState) => [...prevState, form]);
  }

  let list: JSX.Element = <p>Lorem ipsum dolor sit amet, consectetur.</p>;
  if (journalList.length) {
    list = (
      <ul>
        {journalList.map((form: IFormData, idx: number) => (
          <li key={idx}>
            <div>{form.title}</div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <header>{list}</header>
      <main>
        main{timerKey}
        <Button key={timerKey} onClick={() => console.log("asdas")} text="button"></Button>
        <JournalForm key={reset} outputCb={handleDataForm}></JournalForm>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
