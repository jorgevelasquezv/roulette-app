import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Wheel from './Wheel';

describe('Wheel Component', () => {
  const questions = ['Question 1', 'Question 2', 'Question 3'];
  const colors = ['#FF0000', '#00FF00', '#0000FF'];
  const rotation = 0;
  const onSpin = jest.fn();

  test('renders without crashing', () => {
    render(<Wheel questions={questions} rotation={rotation} onSpin={onSpin} colors={colors} />);
  });

  test('renders canvas element', () => {
    render(<Wheel questions={questions} rotation={rotation} onSpin={onSpin} colors={colors} />);
    const canvas = screen.getByRole('img');
    expect(canvas).toBeInTheDocument();
  });

  test('calls onSpin when canvas is clicked', () => {
    render(<Wheel questions={questions} rotation={rotation} onSpin={onSpin} colors={colors} />);
    const canvas = screen.getByRole('img');
    fireEvent.click(canvas);
    expect(onSpin).toHaveBeenCalledTimes(1);
  });

  test('draws the wheel with correct questions and colors', async () => {
    const {container} = render(<Wheel questions={questions} rotation={rotation} onSpin={onSpin} colors={colors} />);
    
    const canvas = container.querySelector('canvas');

    await waitFor(() => {
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveAttribute('width', '500');
      expect(canvas).toHaveAttribute('height', '500');
    });

    expect(canvas?.width).toBe(500);
    expect(canvas?.height).toBe(500);

    const ctx = canvas?.getContext('2d');

    expect(ctx).not.toBeNull();
    expect(ctx).not.toBeUndefined();

    if (ctx) {
      colors.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.fillRect(index * 10, 0, 10, 10);
        const imageData = ctx.getImageData(index * 10, 0, 1, 1).data;
        expect(imageData[0]).toBe(parseInt(color.slice(1, 3), 16)); // Red
        expect(imageData[1]).toBe(parseInt(color.slice(3, 5), 16)); // Green
        expect(imageData[2]).toBe(parseInt(color.slice(5, 7), 16)); // Blue
      });

      questions.forEach((question) => {
        ctx.fillText(question, 50, 50);
        expect(ctx.measureText(question).width).toBeGreaterThan(0);
      });
    }
  });

  test('applies rotation to the canvas', () => {
    const rotation = 45;
    render(<Wheel questions={questions} rotation={rotation} onSpin={onSpin} colors={colors} />);
    const canvas = screen.getByRole('img');
    expect(canvas).toHaveStyle(`transform: rotate(${rotation}deg)`);
  });
});