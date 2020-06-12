import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders the text "Cobuild Lab Template"', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Cobuild Lab Template/i);
  expect(textElement).toBeInTheDocument();
});
