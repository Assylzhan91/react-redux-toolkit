import type { JSX, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ text, onClick }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button onClick={onClick} className="button accent">
        {text}
      </button>
    </div>
  );
};
