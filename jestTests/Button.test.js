/**
 * Testing for the universal Button component 
 */
import { shallow } from 'enzyme';
import Button from '../components /Button/Button';

describe('UniversalButton', () => {
    it('renders correctly', () => {
      const wrapper = shallow(<Button />);
      expect(wrapper).toMatchSnapshot();

    });
  });

describe('UniversalButton', () => {
    describe('when user clicks the Button', () => {
      it ('calls correct function to save the information', () => {
        const onButtonClickMock = jest.fn();
        const wrapper = shallow(
          <Button
            onButtonClick={onButtonClickMock}
          />,
        );
        const buttonElement = wrapper.find('.Button'); 
        buttonElement.simulate('click'); 
        
        expect(onButtonClickMock).toHaveBeenCalledTimes(1); 
        expect(onButtonClickMock).toHaveBeenCalledWith(true);
      });
    });
  });