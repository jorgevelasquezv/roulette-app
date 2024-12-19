import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe('main.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('calls render with the correct component', async () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    const mockRender = jest.fn();
    (createRoot as jest.Mock).mockReturnValue({ render: mockRender });

    await import('./main');

    expect(mockRender).toHaveBeenCalledWith(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
});