import React from 'react';
import App from './App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('check is application title present', () => {
  render(<App />);
  const linkElement = screen.getByText(/Resource Ally/i);
  expect(linkElement).toBeInTheDocument();
});
