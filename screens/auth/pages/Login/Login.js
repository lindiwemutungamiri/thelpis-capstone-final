import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity, Linking, Pressable, StyleSheet } from 'react-native';
import { Button } from '../../../../components ';
import style from "../style";
import { magic, web3 } from '../../../MagicLogin/magic';
import reactDom from 'react-dom';
import Dashboard from '../../../../Dashboard';




export default function Login(props) {


    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [balance, setBalance] = useState('...');

  
    // Trigger magic link for user to login / generate wallet
    const login = async () => {
      try {
        await magic.auth.loginWithMagicLink({ email });
        magic.user.getMetadata().then(setUser);
      } catch(err) {
        alert(err);
      }
    };
  
    return (
      <View style={styles.container}>
        {
        !user ? 
          <View style = {{marginTop: 100}}>
              <View style={{ alignItems: "center" }}>
                            <Image
                                source={require("../../../../assets/icons/Tee.png")}
                                style={{
                                    width: "50%",
                                    height: 100,
                                    resizeMode: "contain",
                                    margin: 30,
                                }}
                            />
                        </View>
            <Text style={styles.header}>Login or Signup</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder='Enter your email'
            />
           
             <View style={style.btnView}>
                    <Button text="Sign In" disabled={false}
                         onPress={() => login()}  />
                </View>
          </View> : 
          <ScrollView>
              <View>
                  <Image
                  source = {require('../../../../assets/icons/AuthenticationSuccessful.png')}
                  style={{
                    width: "80%",
                    height: 100,
                    resizeMode: "contain",
                    margin: 50,
                    alignSelf: "center",
                    marginTop: 200,
                }}

                  />
              </View>
                <View style={style.btnView}>
                    <Button text="Proceed >" disabled={false}
                        onPress={() => navigation.navigate("Dashboard")} />
                </View>

          </ScrollView>
        }
        {/* Below line is required to render the `Relayer` component into the app for Magic to properly work */}
        <magic.Relayer />
      </View>
    );
  }


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
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 38,
        margin: 5,
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#dadae8",
        backgroundColor: 'white',
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
        marginTop: 10,
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
