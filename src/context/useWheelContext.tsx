import { useContext } from 'react';
import { WheelContext } from './wheelContext';

export const useWheelContext = () => {
  const context = useContext(WheelContext);
  if (!context) {
    throw new Error('useWheelContext must be used within a WheelProvider');
  }
  return context;
};