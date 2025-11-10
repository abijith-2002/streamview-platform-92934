import { render, screen, act } from '@testing-library/react';
import App from './App';

jest.useFakeTimers();

test('shows splash screen initially', () => {
  render(<App />);
  // Splash shows title text
  expect(screen.getByRole('status', { name: /loading application/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/streamview loading/i)).toBeInTheDocument();
});

test('transitions to home after timeout', () => {
  render(<App />);
  // advance timers to surpass default splash duration (~1600ms)
  act(() => {
    jest.advanceTimersByTime(1700);
  });
  // Now home content should be visible
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
