import type { JSX } from "react";
import { type SyntheticEvent, useState } from "react";
import "./JournalForm.scss";
import { Button } from "../Button/Button.tsx";
import type { IFormData } from "../../models/data-interface.ts";

interface JournalFormProps {
  outputCb: (form: IFormData) => void;
}

export const JournalForm = ({ outputCb }: JournalFormProps): JSX.Element => {
  const [inputData, setInputData] = useState("");
  const [formValidateState, setFormValidateState] = useState({
    title: true,
    post: true,
    date: true
  });

  const addJournal = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let isFormValidate = false;

    const data = Object.fromEntries(formData.entries()) as unknown as IFormData;
    if (!data.title?.trim()) {
      setFormValidateState((state) => ({ ...state, title: false }));
      isFormValidate = true;
    }
    if (!data.date?.trim()) {
      setFormValidateState((state) => ({ ...state, date: false }));
      isFormValidate = true;
    }
    if (!data.post?.trim()) {
      setFormValidateState((state) => ({ ...state, post: false }));
      isFormValidate = true;
    }

    if (isFormValidate) return;
    outputCb(data);
  };

  const validateTitle = formValidateState.title ? "" : "input-error";
  const validateDate = formValidateState.date ? "" : "input-error";
  const validatePost = formValidateState.post ? "" : "input-error";

  return (
    <form className="journal" onSubmit={(e) => addJournal(e)}>
      <input type="text" name="title" className={"input " + validateTitle} />
      <input type="date" name="date" className={"input " + validateDate} />
      <input
        name="tag"
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <textarea
        name="post"
        id=""
        cols={30}
        rows={10}
        className={"input " + validatePost}
      ></textarea>
      <Button text="Send" onClick={() => console.log("asdsa")}></Button>
    </form>
  );
};
