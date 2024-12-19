import { createContext } from "react";

interface WheelContextProps {
  questions: string[];
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WheelContext = createContext<WheelContextProps | undefined>(
  undefined
);
