import { renderHook } from '@testing-library/react';
import { useWheelContext } from './useWheelContext';
import { WheelContext } from './wheelContext';
import { ReactNode } from 'react';

describe('useWheelContext', () => {
  it('should throw an error if used outside of a WheelProvider', () => {
    const { result } = renderHook(() => {
      try {
        useWheelContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toEqual(Error('useWheelContext must be used within a WheelProvider'));
  });

  it('should return the context value if used within a WheelProvider', () => {
    const mockContextValue = {
      questions: ['Question 1', 'Question 2'],
      setQuestions: jest.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <WheelContext.Provider value={mockContextValue}>
        {children}
      </WheelContext.Provider>
    );

    const { result } = renderHook(() => useWheelContext(), { wrapper });
    expect(result.current).toEqual(mockContextValue);
  });
});