import { render, screen } from '@testing-library/react';
import Signup from '../pages/Signup';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

test('checks if Login Page is rendered', () => {
  render(<BrowserRouter><Signup /></BrowserRouter>);
  const linkElement = screen.getByText(/Create an account with Wits-Overflow/i);
  expect(linkElement).toBeInTheDocument();
});