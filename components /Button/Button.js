import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import style from './style';

/**
 * The props are going to allow us to have different buttons across the entire page 
 * Creating our own custom button that we can have control over the way it looks 
 * @param {*} props 
 * @returns 
 */

export default function Button(props) {
    //the button props so that we can have a customized button wherever we want to use it 
    //if we have a text, then pass in a text
    //if we have an icon, then pass in an icon
    const { text, icon, disabled, btnStyle, onPress, btnTextStyle } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            disabled={disabled}
            style={[style.btnContainer, btnStyle]}
        >

            {text && (
                <Text
                    style={[
                        style.btnText, style.btnTextStyle,
                        btnTextStyle,
                        { marginRight: icon ? 10 : 0 },
                    ]}
                >
                    {text}
                </Text>
            )}
            {icon && <Image source={icon} resizeModel="contain" style={style.iconStyle} />}

        </TouchableOpacity>

    );
}