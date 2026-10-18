import type { JSX } from "react";
import { type SyntheticEvent, useState } from "react";
import styles from "./JournalForm.module.scss";
import { Button } from "../Button/Button.tsx";
import type { IFormData } from "../../models/data-interface.ts";
import classNames from "classnames";

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
    setFormValidateState((state) => ({ ...state, title: !!data.title?.trim() }));
    setFormValidateState((state) => ({ ...state, date: !!data.date?.trim() }));
    setFormValidateState((state) => ({ ...state, post: !!data.post?.trim() }));

    if (!data.title?.trim()) {
      isFormValidate = true;
    }
    if (!data.date?.trim()) {
      isFormValidate = true;
    }
    if (!data.post?.trim()) {
      isFormValidate = true;
    }

    if (isFormValidate) return;
    outputCb(data);
  };

  const inputValidateTitle = classNames(styles.input, {
    [styles["input-error"]]: !formValidateState.title
  });
  const inputValidateDate = classNames(styles.input, {
    [styles["input-error"]]: !formValidateState.date
  });
  const inputValidatePost = classNames(styles.input, {
    [styles["input-error"]]: !formValidateState.post
  });

  return (
    <form className={styles.journal} onSubmit={(e) => addJournal(e)}>
      <input type="text" name="title" className={inputValidateTitle} />
      <input type="date" name="date" className={inputValidateDate} />
      <input
        name="tag"
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <textarea name="post" id="" cols={30} rows={10} className={inputValidatePost}></textarea>
      <Button text="Send" onClick={() => console.log("asdsa")}></Button>
    </form>
  );
};
