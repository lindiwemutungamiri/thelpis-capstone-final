import React from 'react';
import { render} from '@testing-library/react-native';

import NewsList from '../components /NewsList';

it("renders NewsList Default Elements", () =>{
    const {getAllByText} = render(<NewsList/>);

    expect(getAllByText('News').length).toBe(1);

});