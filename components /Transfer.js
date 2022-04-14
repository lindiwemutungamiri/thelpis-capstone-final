import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView, ScrollView, Text, View, TextInput, Pressable, Linking, Image, ImageBackground, TouchableOpacity, Clipboard } from 'react-native';
import {magic, web3} from '../screens/MagicLogin/magic';
import {Login} from '../screens/auth/pages/Login/Login';
import { abi } from '../screens/MagicLogin/contract/abi';


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

       // Send Transaction
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sendTxnBtnDisabled, setSendTxnBtnDisabled] = useState(false);
  const [sendTxnBtnText, setSendTxnBtnText] = useState('Send');
  const [cancelTxnBtnText, setCancelTxnBtnText] = useState('Cancel');
  const [cancelTxnBtnDisabled, setcancelTxnBtnBtnDisabled] = useState(false);


  const [sendTxnHash, setSendTxnHash] = useState('');

  // Submit a transaction to the Ethereum network
   const sendTransaction = async () => {
     if (!amount || !toAddress) return ;
     disableSendTxnForm();
     const { transactionHash } = await web3.eth.sendTransaction({
       from: user.publicAddress,
       to: toAddress,
       value: web3.utils.toWei(amount)
     });
     setSendTxnHash(transactionHash);
     enableSendTxnForm();
   }

  // Disable input form while the transaction is being confirmed
  const disableSendTxnForm = () => {
    setSendTxnHash('');
    setSendTxnBtnDisabled(true);
    setSendTxnBtnText('Pending...');
  }

  // Re-enable input form once the transaction is confirmed
  const enableSendTxnForm = () => {
    setSendTxnBtnDisabled(false);
    setToAddress(''); // Clear form inputs
    setAmount(''); // Clear form inputs
    fetchBalance(user.publicAddress); // Update balance after gas fee paid for transaction
    setSendTxnBtnText('Send');
  }
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
              source={require("../assets/icons/banner.png")}
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

                  {/* Balance Section */}
                  <View
                  style ={{
                      alignItems: "center",
                      justifyContent: "center"

                  }}
                  >
                      <Text style = {{color: "white",fontSize: 13}}>Your Portfolio Balance</Text>
                      <Text style={{color: "white", fontSize: 20}}>{balance} ETH</Text>

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
        
               <Image
                  source={require("../assets/icons/lottie.webp")}
                  style={{
                      width: 30,
                      height: 30
                  }}

               />
               <View>
                   <Text>Wallet Address</Text>
                   <Text>{user.publicAddress}</Text>
               </View>
             

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

            <View style={styles.view}>
              <Text style={styles.header}>Transact</Text>
              <TextInput style={styles.input} value={toAddress} onChangeText={text => setToAddress(text)} placeholder="To..."></TextInput>
              <TextInput style={styles.input} value={amount} onChangeText={text => setAmount(text)} placeholder="Amount..."></TextInput>
              <Pressable style={styles.button} onPress={() => sendTransaction()} disabled={sendTxnBtnDisabled}><Text style={styles.buttonText}>{sendTxnBtnText}</Text></Pressable>
              {/* <Pressable style={styles.button} onPress={() => enableSendTxnForm()} disabled={cancelTxnBtnDisabled}><Text style={styles.buttonText}>{cancelTxnBtnText}</Text></Pressable> */}
              <Text style={styles.text}>{sendTxnHash && <Text onPress={() => Linking.openURL(`https://rinkeby.etherscan.io//tx/${sendTxnHash}`)}>Sent! View Transaction ↗️</Text>}</Text>
            </View>
            <View style = {{paddingTop: 3 ,paddingVertical: 20}}>
              <TouchableOpacity style={styles.button} onPress={() => copyToClipboard()} disabled={copyBtnDisabled}><Text style={styles.buttonText}>{CopyAddressBtnText}</Text></TouchableOpacity> 

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
        marginTop: 10
    }
});
