import { useState, useMemo, useCallback, useRef, ChangeEvent } from "react";
import {
  INITIAL_QUESTIONS,
  INITIAL_COLORS,
  INITIAL_ROTATION,
  TRANSITION_DURATION,
} from "../lib/conts";
import { useWheelContext } from "../context/useWheelContext";

export const useWheel = () => {
  const {questions, setQuestions} = useWheelContext();
  const [selectedQuestion, setSelectedQuestion] = useState<string>();
  const [rotation, setRotation] = useState(0);
  const actualQuestions = useRef<string[]>(questions);
  const [isRemoveQuestion, setIsRemoveQuestion] = useState(true);

  const colors = useMemo(() => INITIAL_COLORS, []);

  const handleRemoveQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRemoveQuestion(e.target.checked);
  };

  const removeQuestions = () => {
    if (isRemoveQuestion){
      if (actualQuestions.current.length > 1 ){
        actualQuestions.current =  actualQuestions.current.filter(
          (question) => question !== selectedQuestion
        );
      };
      setQuestions(actualQuestions.current);
    }
  }

  const calculateSelectedQuestionIndex = (newRotation: number) => {
    const degreesPerSegment = 360 / actualQuestions.current.length;
    const normalizedRotation = ((newRotation % 360) + 360) % 360;
    return Math.floor((360 - normalizedRotation) / degreesPerSegment) % actualQuestions.current.length;
  };
  
  const spinWheel = () => {
    removeQuestions();
    setSelectedQuestion("");
    const newRotation = rotation + Math.floor(Math.random() * 360) + INITIAL_ROTATION;
    setRotation(newRotation);

    setTimeout(() => {
      setSelectedQuestion(actualQuestions.current[calculateSelectedQuestionIndex(newRotation)]);
    }, TRANSITION_DURATION);
  };

  const handleTextareaChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lines = event.target.value
        .split("\n")
        .filter((line) => line.trim() !== "");
      actualQuestions.current = lines;
        setQuestions(lines);
    },
    [setQuestions]
  );

  const resetWheel = () => {
      const textarea = document.getElementById(
        "questions-area"
      ) as HTMLTextAreaElement;
      const lines = textarea.value
        .split("\n")
        .filter((line) => line.trim() !== "");
      setQuestions(lines.length !== 0 ? lines : INITIAL_QUESTIONS);
      setRotation(0);
      setSelectedQuestion("");
    };

  return {
    questions,
    selectedQuestion,
    rotation,
    colors,
    isRemoveQuestion,
    spinWheel,
    handleTextareaChange,
    handleRemoveQuestion,
    resetWheel,
  };
};
