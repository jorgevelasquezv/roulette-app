import { ReactNode, useState } from "react";
import { WheelContext } from "./wheelContext";
import { INITIAL_QUESTIONS } from "../lib/conts";

interface WheelProviderProps {
    children: ReactNode;
  }

export const WheelProvider: React.FC<WheelProviderProps> = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<string[]>(INITIAL_QUESTIONS);

  return (
    <WheelContext.Provider value={{ questions, setQuestions }}>
      {children}
    </WheelContext.Provider>);
  };