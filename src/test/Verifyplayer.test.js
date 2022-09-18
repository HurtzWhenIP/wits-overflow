import { render, screen } from '@testing-library/react';
import Verifyplayer from '../pages/Verifyplayer';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

test('checks if Login Page is rendered', () => {
  render(<BrowserRouter><Verifyplayer /></BrowserRouter>);
  const linkElement = screen.getByText(/CSAM/i);
  expect(linkElement).toBeInTheDocument();
});