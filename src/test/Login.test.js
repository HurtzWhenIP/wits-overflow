import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

test('checks if Login Page is working', () => {
  const {getByText , getByDisplayValue, debug} = render(<BrowserRouter><Login /></BrowserRouter>);
  //const linkElement = screen.getByText(/Wits-Overflow Login/i);
  expect(getByText(/Wits-Overflow Login/i)).toBeInTheDocument();
  //const linkElement = within(getByText(/Username/i).parentElement);


});