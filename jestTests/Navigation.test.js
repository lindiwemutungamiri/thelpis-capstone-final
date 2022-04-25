import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Dashboard, { Home, Portfolio, Transfer, Logout } from '../components /Home';

describe('Home Screen', () => {
  it('navigates on button press', () => {
    const push = jest.fn();
    const { getByText } = render(<Home navigation={{ push }} />);
    fireEvent.press(getByText('Go to Logout Screen'));
    expect(push).toHaveBeenCalledWith('Logout');
  });
});