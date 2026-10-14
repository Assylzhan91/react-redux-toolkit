import type { JSX, ReactNode } from "react";

interface IJournalList {
  children: ReactNode;
}

export const JournalList = ({ children }: IJournalList): JSX.Element => {
  return <div>{children}</div>;
};
