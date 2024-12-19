import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckboxRemoveQuestion from './CheckboxRemoveQuestion';


test('renders CheckboxRemoveQuestion component', () => {
  const handleChange = jest.fn();
  render(<CheckboxRemoveQuestion label="Test Label" checked={false} onChange={handleChange} />);

  const checkbox = screen.getByLabelText(/Test Label/i);
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);
  expect(handleChange).toHaveBeenCalledTimes(1);
});