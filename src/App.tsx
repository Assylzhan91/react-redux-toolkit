import { type JSX, useCallback, useState } from "react";

import { Button } from "./components/Button/Button.tsx";
import "./App.css";
import { JournalForm } from "./components/JournalForm/JournalForm.tsx";
import type { IFormData } from "./models/data-interface.ts";
import { JournalList } from "./components/JournalList/JournalList.tsx";

function App() {
  const [journalList, setJournalList] = useState<IFormData[]>([]);

  const handleDataForm = useCallback((form: IFormData) => {
    setJournalList((prevState) => [...prevState, form]);
  }, []);

  let list: JSX.Element = <p>Lorem ipsum dolor sit amet, consectetur.</p>;
  if (journalList.length) {
    list = (
      <ul>
        {journalList.map((form: IFormData, idx: number) => (
          <JournalList key={idx}>
            <div>{form.title}</div>
          </JournalList>
        ))}
      </ul>
    );
  }
  return (
    <>
      <header>{list}</header>
      <main>
        <Button onClick={() => console.log("asdas")} text="button"></Button>
        <JournalForm outputCb={handleDataForm}></JournalForm>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
