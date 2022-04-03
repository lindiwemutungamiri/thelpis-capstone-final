import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Button } from '../../../../components ';
import style from '../style';


export default function CreateAccount(props) {

    const { navigation } = props;

    const [firstName, setFirstName] = useState('');  //creating custom hooks 
    const [lastName, setLastName] = useState('');  //creating custom hooks 
    const [email, setEmail] = useState(''); //creating custom hooks 
    const [password, setPassword] = useState('');  //creating custom hooks 


    return (
        <SafeAreaView style={style.container}>
            <ScrollView contentContainerStyle={style.mainView}>
                <View>
                    <Text style={style.textStyle}>
                        Create Your Thelpis Account
                    </Text>
                    <View style={style.setMargin}>
                        <Text>First Name</Text>
                        <TextInput
                            value={firstName}
                            placeholder="Lindiwe"
                            style={style.textInputStyle}
                            onChangeText={(text) => setFirstName(text)}
                        />
                    </View>
                    <View style={style.setMargin}>
                        <Text>Last Name</Text>
                        <TextInput
                            value={lastName}
                            placeholder="Mutungamiri"
                            style={style.textInputStyle}
                            onChangeText={(text) => setLastName(text)}
                        />
                    </View>
                    <View style={style.setMargin}>
                        <Text>Email</Text>
                        <TextInput
                            value={email}
                            placeholder="lmutu@gmail.com"
                            style={style.textInputStyle}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={style.setMargin}>
                        <Text>Password</Text>
                        <TextInput
                            value={password}
                            placeholder="*******"
                            style={style.textInputStyle}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <View style={style.section}>
                        <Text style={style.textStyle2}>
                            I certify that I am 18 years of age or older, and I agree to
                            the
                            <TouchableWithoutFeedback>
                                <Text style={style.linkStyle2}> User Agreement </Text>
                            </TouchableWithoutFeedback>
                            and
                            <TouchableWithoutFeedback>
                                <Text style={style.linkStyle2}> Privacy Policy. </Text>
                            </TouchableWithoutFeedback>

                        </Text>

                    </View>


                </View>

                <View style={style.btnView}>
                    <Button text="Register" disabled={false} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
