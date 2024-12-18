import './CheckboxRemoveQuestion.css';
import React, { ChangeEvent } from "react";

interface CheckboxRemoveQuestionProps {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxRemoveQuestion: React.FC<CheckboxRemoveQuestionProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" onChange={onChange} checked={checked} id="remove-question-checkbox" />
      <label htmlFor="remove-question-checkbox">{label}</label>
    </div>
  );
};

export default CheckboxRemoveQuestion;
