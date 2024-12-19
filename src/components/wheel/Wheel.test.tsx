import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Wheel from './Wheel';

test('renders Wheel component', () => {
  const questions = ["Opción 1", "Opción 2"];
  const handleSpin = jest.fn();
  render(<Wheel questions={questions} rotation={0} onSpin={handleSpin} colors={["#ff64bb", "#fff"]} />);

  const canvas = screen.getByRole('img')  as HTMLCanvasElement;
  expect(canvas).toBeInTheDocument();

  fireEvent.click(canvas);
  expect(handleSpin).toHaveBeenCalledTimes(1);
});

// test('draws the wheel with correct number of segments', () => {
//   const questions = ["Opción 1", "Opción 2", "Opción 3"];
//   const handleSpin = jest.fn();
//   render(<Wheel questions={questions} rotation={0} onSpin={handleSpin} colors={["#ff64bb", "#fff", "#64ffbb"]} />);

//   const canvas = screen.getByRole('img')  as HTMLCanvasElement;
//   const ctx = canvas.getContext('2d');
//   expect(ctx).not.toBeNull();

//   // Mock the context methods
//   ctx.beginPath = jest.fn();
//   ctx.moveTo = jest.fn();
//   ctx.arc = jest.fn();
//   ctx.closePath = jest.fn();
//   ctx.fill = jest.fn();
//   ctx.stroke = jest.fn();
//   ctx.save = jest.fn();
//   ctx.translate = jest.fn();
//   ctx.rotate = jest.fn();
//   ctx.textAlign = "right";
//   ctx.fillStyle = "#000";
//   ctx.font = "bold 16px Arial";
//   ctx.fillText = jest.fn();
//   ctx.restore = jest.fn();

//   // Trigger the drawWheel function
//   fireEvent.click(canvas);

//   // Verify that the wheel is drawn with the correct number of segments
//   expect(ctx.beginPath).toHaveBeenCalledTimes(3);
//   expect(ctx.moveTo).toHaveBeenCalledTimes(3);
//   expect(ctx.arc).toHaveBeenCalledTimes(3);
//   expect(ctx.closePath).toHaveBeenCalledTimes(3);
//   expect(ctx.fill).toHaveBeenCalledTimes(3);
//   expect(ctx.stroke).toHaveBeenCalledTimes(3);
//   expect(ctx.save).toHaveBeenCalledTimes(3);
//   expect(ctx.translate).toHaveBeenCalledTimes(3);
//   expect(ctx.rotate).toHaveBeenCalledTimes(3);
//   expect(ctx.fillText).toHaveBeenCalledTimes(3);
//   expect(ctx.restore).toHaveBeenCalledTimes(3);
// });

// test('draws the wheel with correct colors', () => {
//   const questions = ["Opción 1", "Opción 2", "Opción 3"];
//   const handleSpin = jest.fn();
//   render(<Wheel questions={questions} rotation={0} onSpin={handleSpin} colors={["#ff64bb", "#fff", "#64ffbb"]} />);

//   const canvas = screen.getByRole('img')  as HTMLCanvasElement;
//   const ctx = canvas.getContext('2d');
//   expect(ctx).not.toBeNull();

//   // Mock the context methods
//   ctx.fill = jest.fn();

//   // Trigger the drawWheel function
//   fireEvent.click(canvas);

//   // Verify that the wheel is drawn with the correct colors
//   expect(ctx.fillStyle).toBe("#ff64bb");
//   expect(ctx.fillStyle).toBe("#fff");
//   expect(ctx.fillStyle).toBe("#64ffbb");
// });