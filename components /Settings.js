import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView, ScrollView, Text, View, TextInput, Pressable, Linking } from 'react-native';
import {magic, web3} from '../screens/MagicLogin/magic';
import Login from '../screens/auth/pages/Login/Login';
import { abi } from '../screens/MagicLogin/contract/abi';
import style from '../screens/welcome/style';
import Button from './Button/Button';



const Settings = (props) => {
     // User
     const { navigation } = props;

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');

  // Logout of Magic session
 
   const logout = async () => {
    await magic.user.logout();
    setUser('');
  };

    return (
        <SafeAreaView>
   <View style={style.btnView}>
                    <Button 
                    text="Log Out" 
                    disabled={false}
                    onPress={() =>  logout()}
                     />
                </View>
        </SafeAreaView>

    )
}
export default Settings 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 60,
      marginBottom: 60
    },
    view: {
      backgroundColor: "#eee",
      padding: 20,
      marginTop: 15,
      borderRadius: 8,
    },
    header: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 10,
    },
    info: {
      fontFamily: 'Courier',
      backgroundColor: '#ddd',
      padding: 10,
      marginBottom: 10,
      textAlign: "center"
    },
    input: {
      height: 38,
      margin: 5,
      borderWidth: 1,
      padding: 6,
      backgroundColor: '#fff',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 4,
      backgroundColor: 'black',
      marginTop: 12,
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    text: {
      textAlign: "center",
      marginTop: 10
    }
  });
  