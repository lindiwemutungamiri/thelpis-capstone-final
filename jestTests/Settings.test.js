import React from 'react';
import { render} from '@testing-library/react-native';

import Settings from "../components /Settings";
it("renders default elements", () =>{
    const {getAllByText} = render(<Settings/>);

    expect(getAllByText('Logout').length).toBe(1);


});