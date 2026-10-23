import type { ChangeEvent, JSX } from "react";
import { type SyntheticEvent, useEffect, useReducer } from "react";
import styles from "./JournalForm.module.scss";
import { Button } from "../Button/Button.tsx";
import type { IFormData } from "../../models/data-interface.ts";
import classNames from "classnames";

const ACTION_TYPES = {
  SUBMIT_FORM: "SUBMIT_FORM",
  RESET: "RESET",
  CLEAR: "CLEAR",
  SET_VALUE: "SET_VALUE"
} as const;

type Field = keyof IFormDataState["values"];

type SetValueActionType = {
  type: typeof ACTION_TYPES.SET_VALUE;
  payload: Partial<Record<Field, string>>;
};

type ResetActionType = {
  type: typeof ACTION_TYPES.RESET;
};

type ClearActionType = {
  type: typeof ACTION_TYPES.CLEAR;
};

type SubmitFormActionType = {
  type: typeof ACTION_TYPES.SUBMIT_FORM;
  payload: IFormDataState["values"];
};

type FormActionType = SubmitFormActionType | ResetActionType | ClearActionType | SetValueActionType;
type IFormValues = IFormDataState["values"];

interface JournalFormProps {
  outputCb: (form: IFormData) => void;
}

interface IFormDataState {
  validators: {
    title: boolean;
    date: boolean;
    post: boolean;
  };
  values: {
    title: string;
    date: string;
    post: string;
    tag?: string;
  };
  isSubmitted: boolean;
}

const formData: IFormDataState = {
  validators: {
    title: false,
    date: false,
    post: false
  },
  values: {
    title: "",
    date: "",
    post: "",
    tag: ""
  },
  isSubmitted: false
};

function reducer(state: IFormDataState, action: FormActionType): IFormDataState {
  switch (action.type) {
    case ACTION_TYPES.SUBMIT_FORM: {
      const { post, title, date, tag } = action.payload;
      return {
        ...state,
        values: {
          title: title.trim(),
          date: date.trim(),
          post: post.trim(),
          tag: tag?.trim() ?? ""
        },
        validators: {
          post: !post,
          date: !date,
          title: !title
        },
        isSubmitted: !!post && !!date && !!title
      };
    }
    case ACTION_TYPES.RESET: {
      return {
        ...state,
        validators: {
          title: false,
          date: false,
          post: false
        },
        isSubmitted: false
      };
    }
    case ACTION_TYPES.CLEAR: {
      return {
        ...state,
        values: formData.values,
        isSubmitted: false
      };
    }
    case ACTION_TYPES.SET_VALUE: {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload
        }
      };
    }

    default: {
      throw Error(`Unknown action: ${action}`);
    }
  }
}

export const JournalForm = ({ outputCb }: JournalFormProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, formData);
  const { values, isSubmitted } = state;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!values.title || !values.date || !values.post)
      timer = setTimeout(() => {
        dispatch({ type: ACTION_TYPES.RESET });
      }, 2000);

    return () => clearTimeout(timer);
  }, [values]);

  useEffect(() => {
    if (isSubmitted) {
      outputCb({ ...values });
      dispatch({ type: ACTION_TYPES.CLEAR });
    }
  }, [isSubmitted, outputCb, values]);

  const addJournal = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries()) as unknown as IFormData;
    const values: IFormValues = {
      title: formValues.title.trim(),
      date: formValues.date.trim(),
      post: formValues.post.trim()
    };
    dispatch({ type: ACTION_TYPES.SUBMIT_FORM, payload: values });
  };

  function onChangeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    dispatch({ type: ACTION_TYPES.SET_VALUE, payload: { [e.target.name]: e.target.value } });
  }

  const inputValidateTitle = classNames(styles.input, {
    [styles["input-error"]]: state.validators.title
  });
  const inputValidateDate = classNames(styles.input, {
    [styles["input-error"]]: state.validators.date
  });
  const inputValidatePost = classNames(styles.input, {
    [styles["input-error"]]: state.validators.post
  });

  return (
    <form className={styles.journal} onSubmit={(e) => addJournal(e)}>
      <input
        type="text"
        value={values.title}
        name="title"
        className={inputValidateTitle}
        onChange={(e) => onChangeHandler(e)}
      />
      <input
        type="date"
        value={values.date}
        onChange={(e) => onChangeHandler(e)}
        name="date"
        className={inputValidateDate}
      />
      <input name="tag" type="text" value={values?.tag} onChange={(e) => onChangeHandler(e)} />
      <textarea
        value={values.post}
        name="post"
        cols={30}
        rows={10}
        className={inputValidatePost}
        onChange={(e) => onChangeHandler(e)}
      ></textarea>
      <Button text="Send" onClick={() => console.log("asdsa")}></Button>
    </form>
  );
};
