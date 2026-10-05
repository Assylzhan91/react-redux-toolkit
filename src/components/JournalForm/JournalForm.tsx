import { type SyntheticEvent, useState } from "react";
import "./JournalForm.scss";
import { Button } from "../Button/Button.tsx";

export const JournalForm = () => {
  const [inputData, setInputData] = useState("");

  const addJournal = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Данные формы:", data);
  };

  return (
    <form className="journal" onSubmit={(e) => addJournal(e)}>
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input
        name="tag"
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <textarea name="post" id="" cols={30} rows={10}></textarea>
      <Button text="Send" onClick={() => console.log("asdsa")}></Button>
    </form>
  );
};
