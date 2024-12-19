import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import WheelPage from './WheelPage';
import { useWheelContext } from '../context/useWheelContext';
import { useWheel } from '../hooks/useWheel';

// Mock the custom hooks
jest.mock('../context/useWheelContext');
jest.mock('../hooks/useWheel');

describe('WheelPage', () => {
  beforeEach(() => {
    (useWheelContext as jest.Mock).mockReturnValue({ questions: ['Question 1', 'Question 2'] });
    (useWheel as jest.Mock).mockReturnValue({
      colors: ['#FF0000', '#00FF00'],
      handleTextareaChange: jest.fn(),
      handleRemoveQuestion: jest.fn(),
      isRemoveQuestion: false,
      resetWheel: jest.fn(),
      rotation: 0,
      selectedQuestion: '',
      spinWheel: jest.fn(),
    });
  });

  test('renders the title', () => {
    render(<WheelPage />);
    const titleElement = screen.getByText(/¡Ruleta de la suerte!/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the Wheel component', () => {
    render(<WheelPage />);
    const wheelElement = screen.getByRole('img');
    expect(wheelElement).toBeInTheDocument();
  });

  test('renders the textarea and handles input', () => {
    render(<WheelPage />);
    const textareaElement = screen.getByPlaceholderText(/Ingresa los datos finalizando con un enter para cada uno/i);
    expect(textareaElement).toBeInTheDocument();
    fireEvent.change(textareaElement, { target: { value: 'New Question' } });
    expect(useWheel().handleTextareaChange).toHaveBeenCalled();
  });

  test('renders the CheckboxRemoveQuestion component and handles change', () => {
    render(<WheelPage />);
    const checkboxElement = screen.getByLabelText(/Eliminar pregunta seleccionada/i);
    expect(checkboxElement).toBeInTheDocument();
    fireEvent.click(checkboxElement);
    expect(useWheel().handleRemoveQuestion).toHaveBeenCalled();
  });

  test('renders the spin button and handles click', () => {
    render(<WheelPage />);
    const spinButtonElement = screen.getByText(/Girar/i);
    expect(spinButtonElement).toBeInTheDocument();
    fireEvent.click(spinButtonElement);
    expect(useWheel().spinWheel).toHaveBeenCalled();
  });

  test('renders the reset button and handles click', () => {
    render(<WheelPage />);
    const resetButtonElement = screen.getByText(/Reset/i);
    expect(resetButtonElement).toBeInTheDocument();
    fireEvent.click(resetButtonElement);
    expect(useWheel().resetWheel).toHaveBeenCalled();
  });
});