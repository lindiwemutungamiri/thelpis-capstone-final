import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView, ScrollView, Text, View, TextInput, Pressable, Linking, Clipboard,} from 'react-native';
import {magic, web3} from '../screens/MagicLogin/magic';
import {Login} from '../screens/auth/pages/Login/Login';
import { abi } from '../screens/MagicLogin/contract/abi';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Blockie from './Blockie';


const Portfolio = () => {

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [balance, setBalance] = useState('...');

   


    const fetchBalance = (address) => {
        web3.eth.getBalance(address).then(bal => setBalance(web3.utils.fromWei(bal)))
      }

    useEffect(() => {
        magic.user.isLoggedIn().then(isLoggedIn => {
          if (!isLoggedIn) return setUser('');
          magic.user.getMetadata().then(user => {
            setUser(user);
            fetchBalance(user.publicAddress);
            fetchContractMessage();
          });
        })
      }, [])




    return (
        <SafeAreaView>

         <View style={styles.view}>
              <Text style={styles.header}>Network</Text>
              <Text style={styles.info}>Ethereum</Text>

              <Text style={styles.header}>Public Address</Text>
              <Text style={styles.info} selectable>{user.publicAddress}</Text>

              <Text style={styles.header}>Balance</Text>
              <Text style={styles.info}>{balance} ETH</Text>

            </View>
          
    </SafeAreaView>

    )
}
export default Portfolio 




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
        marginTop: 10,
    }, 
});
