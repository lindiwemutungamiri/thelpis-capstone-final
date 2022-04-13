import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView, ScrollView, Text, View, TextInput, Pressable, Linking, Image, ImageBackground, TouchableOpacity, Clipboard } from 'react-native';
import {magic, web3} from '../screens/MagicLogin/magic';
import {Login} from '../screens/auth/pages/Login/Login';
import { abi } from '../screens/MagicLogin/contract/abi';
import style from '../screens/welcome/style';
import Button from './Button/Button';

const Settings = (props) => {
     // User
     const { navigation } = props;

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');

  const [sendTxnBtnDisabled, setSendTxnBtnDisabled] = useState(false);
  const [sendTxnBtnText, setSendTxnBtnText] = useState('Logout');

  // Logout of Magic session
 
   const logout = async () => {
    await magic.user.logout();
    setUser('');
    navigation.navigate('Login');
  };
  
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
      Clipboard.setString(user.publicAddress);

  };


  const fetchCopiedText = async () =>{
      const text = await Clipboard.getStringAsync();
      setCopiedText(user.publicAddress);

  }
  const [CopyAddressBtnText, setCopyAddressBtnText] = useState('Receive');
 const [copyBtnDisabled, setcopyBtnDisabledBtnDisabled] = useState(false);


  function renderHeader (){
    return (
        <View
        style = {{
            width: "100%",
            height: 290,
            ...styles.shadow


        }}

        >
            <ImageBackground
              source={require("../assets/icons/ethdoor.png")}
              resizeMode="cover"
              style={{
                  flex: 1,
                  alignItems: "center"
              }}
              >
                  {/* Header Bar  */}
                  <View 
                  style = {{
                      marginTop: 20,
                      width: "100%",
                      alignItems: "flex-end",
                      paddingHorizontal: 20
                  }}
                   >
                       <TouchableOpacity
                       style ={{
                           width: 35,
                           height: 35,
                           alignItems: "center",
                           justifyContent: "center"
                       }}
                       onPress = {() => console.log("Notifications on Pressed")}
                       >

                       </TouchableOpacity>


                  </View>

                  <View>
           <TouchableOpacity
           style={{
               flexDirection: "row",
               alignItems: "center",
               marginTop: 60,
               marginHorizontal: 14,
               paddingVertical: 7,
               paddingHorizontal: 15,
               backgroundColor: "white",
               borderRadius: 20,
               shadowColor: "#000",
               shadowOffset:{
                   width: 0,
                   height: 4,
               },
               shadowOpacity: 0.30,
               shadowRadius: 4.65,
               elevation: 8


           }}
           onPress={() => copyToClipboard()} disabled={copyBtnDisabled}
           > 
        
             
           

           </TouchableOpacity>
       </View>

            </ImageBackground>
          

        </View>
    )

}


    return (
        <SafeAreaView>
           <View>
                 {renderHeader()}
             </View>

             <View>
         
             <Pressable 
             style={styles.button} 
            // onPress={() => navigation.navigate("Login")} 

             onPress={() => logout()} 
             disabled={sendTxnBtnDisabled}><Text style={styles.buttonText}>{sendTxnBtnText}</Text></Pressable>

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
      backgroundColor: "#0B0B45",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 100,
        marginRight: 100,
        marginTop: 200,
        marginBottom: 25,
    },
    buttonText: {
      
      color: "gold",
      paddingVertical: 10,
      fontSize: 20,
      fontWeight: "600",
    },
    text: {
      textAlign: "center",
      marginTop: 10
    }
  });
  