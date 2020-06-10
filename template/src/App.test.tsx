import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders the text "Cobuildlab Template"', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Cobuildlab Template/i);
  expect(textElement).toBeInTheDocument();
});
