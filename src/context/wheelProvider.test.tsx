import { render } from '@testing-library/react';
import { WheelProvider } from './wheelProvider';
import { INITIAL_QUESTIONS } from '../lib/conts';
import React from 'react';

jest.mock('./wheelContext', () => ({
  WheelContext: {
    Provider: jest.fn(({ children }) => <div>{children}</div>),
  },
}));

describe('WheelProvider', () => {
  test('initializes questions state correctly', () => {
    const useStateSpy = jest.spyOn(React, 'useState');
    render(
      <WheelProvider>
        <div>Test Child</div>
      </WheelProvider>
    );
    expect(useStateSpy).toHaveBeenCalledWith(INITIAL_QUESTIONS);
  });

  test('setQuestions updates the state correctly', () => {
    const setQuestionsMock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [INITIAL_QUESTIONS, setQuestionsMock]);

    render(
      <WheelProvider>
        <div>Test Child</div>
      </WheelProvider>
    );

    const newQuestions = ['Question 1', 'Question 2'];
    setQuestionsMock(newQuestions);

    expect(setQuestionsMock).toHaveBeenCalledWith(newQuestions);
  });
});