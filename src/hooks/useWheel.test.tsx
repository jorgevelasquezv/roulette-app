import { renderHook, act } from '@testing-library/react';
import { useWheelContext } from '../context/useWheelContext';
import { useWheel } from './useWheel';
import { INITIAL_COLORS } from '../lib/conts';
import { ChangeEvent } from 'react';

jest.mock('../context/useWheelContext');

describe('useWheel', () => {
  const mockSetQuestions = jest.fn();
  const mockQuestions = ['Question 1', 'Question 2', 'Question 3'];

  beforeEach(() => {
    (useWheelContext as jest.Mock).mockReturnValue({
      questions: mockQuestions,
      setQuestions: mockSetQuestions,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useWheel());

    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.selectedQuestion).toBeUndefined();
    expect(result.current.rotation).toBe(0);
    expect(result.current.colors).toEqual(INITIAL_COLORS);
    expect(result.current.isRemoveQuestion).toBe(true);
  });

  it('should handle remove question checkbox change', () => {
    const { result } = renderHook(() => useWheel());

    act(() => {
      result.current.handleRemoveQuestion({ target: { checked: false } } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isRemoveQuestion).toBe(false);
  });

  it('should remove selected question when spinning the wheel', () => {
    const { result } = renderHook(() => useWheel());

    act(() => {
      result.current.spinWheel();
    });

    expect(mockSetQuestions).toHaveBeenCalledWith(expect.not.arrayContaining([result.current.selectedQuestion]));
  });

  it('should update questions on textarea change', () => {
    const { result } = renderHook(() => useWheel());
    const newQuestions = 'New Question 1\nNew Question 2';

    act(() => {
      result.current.handleTextareaChange({ target: { value: newQuestions } } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(mockSetQuestions).toHaveBeenCalledWith(['New Question 1', 'New Question 2']);
  });

  it('should reset wheel to initial state', () => {
    const { result } = renderHook(() => useWheel());

    document.body.innerHTML = '<textarea id="questions-area">Reset Question 1\nReset Question 2</textarea>';

    act(() => {
      result.current.resetWheel();
    });

    expect(mockSetQuestions).toHaveBeenCalledWith(['Reset Question 1', 'Reset Question 2']);
    expect(result.current.rotation).toBe(0);
    expect(result.current.selectedQuestion).toBe('');
  });
});