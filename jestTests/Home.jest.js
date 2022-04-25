import React from 'react';
import { render} from '@testing-library/react-native';

import Home from '../components /Home';

it("renders Home Default Elements", () =>{
    const {getAllByText} = render(<Login/>);

    expect(getAllByText('Receive Crypto').length).toBe(1);

});