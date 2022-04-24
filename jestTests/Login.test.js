import React from 'react';
import { render} from '@testing-library/react-native';

import Login from '../screens/auth/pages/Login/Login';

it("renders default elements", () =>{
    const {getAllByText} = render(<Login/>);

    expect(getAllByText('Login or Signup').length).toBe(1);

});

//shows invalid email error message 

//shows invalid input messages 

//handles valid input submission 