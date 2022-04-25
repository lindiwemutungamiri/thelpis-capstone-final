import React from 'react';
import { render} from '@testing-library/react-native';

import Transfer from "../components /Transfer";
it("renders default elements", () =>{
    const {getAllByText} = render(<Transfer/>);

    expect(getAllByText('Send').length).toBe(1);


});