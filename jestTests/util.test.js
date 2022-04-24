import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
const {generateText} = require('../util');

test('should output name and age', () =>{
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');

});