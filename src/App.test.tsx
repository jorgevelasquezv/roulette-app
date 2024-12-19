import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { WheelProvider } from "./context/wheelProvider";
import WheelPage from "./pages/WheelPage";

// Mock the components
jest.mock('./context/wheelProvider');
jest.mock('./pages/WheelPage');

describe('App', () => {
  beforeEach(() => {
    (WheelProvider as jest.Mock).mockImplementation(({ children }) => <div>{children}</div>);
    (WheelPage as jest.Mock).mockReturnValue(<div>WheelPage Component</div>);
  });

  test('renders WheelProvider', () => {
    render(<App />);
    expect(WheelProvider).toHaveBeenCalled();
  });

  test('renders WheelPage inside WheelProvider', () => {
    render(<App />);
    const wheelPageElement = screen.getByText(/WheelPage Component/i);
    expect(wheelPageElement).toBeInTheDocument();
  });
});