import { render, screen } from '@testing-library/react';
import Homepage from '../pages/Homepage';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

test('checks if Login Page is rendered', () => {
  render(<BrowserRouter><Homepage /></BrowserRouter>);
  const linkElement = screen.getByText(/Search For a Question/i);
  expect(linkElement).toBeInTheDocument();
});