import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders correctly', () => {
    render(<Button onClick={() => {}} className="test-class">Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} className="test-class">Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies the correct className', () => {
    render(<Button onClick={() => {}} className="test-class">Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toHaveClass('button test-class');
  });

  test('renders children correctly', () => {
    render(<Button onClick={() => {}} className="test-class">Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});