import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView, ScrollView, Text, View, TextInput, Pressable, Linking } from 'react-native';
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
  const [sendTxnHash, setSendTxnHash] = useState('');

  // Submit a transaction to Celo network
  const sendTransaction = async () => {
    if (!amount || !toAddress) return;
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

   // Update Smart Contract Message
   const contractAddress = '0x1e1bF128A09fD30420CE9fc294C4266C032eF6E7';
   const contract = new web3.eth.Contract(abi, contractAddress);
   const [message, setMessage] = useState('...');
   const [newMessage, setNewMessage] = useState('');
   const [updateContractBtnDisabled, setUpdateContractBtnDisabled] = useState(false);
   const [updateContractBtnText, setUpdateContractBtnText] = useState('Update');
   const [updateContractTxnHash, setUpdateContractTxnHash] = useState('');

  const fetchContractMessage = () => contract.methods.message().call().then(setMessage);

  const updateContractMessage = async () => {
    if (!newMessage) return;
    disableUpdateContractForm();
    let { transactionHash } = await contract.methods.update(newMessage).send({ from: user.publicAddress });
    setUpdateContractTxnHash(transactionHash);
    enableUpdateContractForm();
  }

  const disableUpdateContractForm = () => {
    setUpdateContractBtnDisabled(true);
    setUpdateContractTxnHash(''); // Clear link to previous transaction hash
    setUpdateContractBtnText('Pending...');
  }

  const enableUpdateContractForm = () => {
    setUpdateContractBtnDisabled(false);
    setNewMessage(''); // Clear form input
    fetchBalance(user.publicAddress); // Update balance after gas fee paid for transaction
    fetchContractMessage(); // Show new value of the smart contract variable `message`
    setUpdateContractBtnText('Update');
  }

    return (
        <SafeAreaView>

            <View style={styles.view}>
              <Text style={styles.header}>Send Crypto</Text>
              <TextInput style={styles.input} value={toAddress} onChangeText={text => setToAddress(text)} placeholder="To..."></TextInput>
              <TextInput style={styles.input} value={amount} onChangeText={text => setAmount(text)} placeholder="Amount..."></TextInput>
              <Pressable style={styles.button} onPress={() => sendTransaction()} disabled={sendTxnBtnDisabled}><Text style={styles.buttonText}>{sendTxnBtnText}</Text></Pressable>
              <Text style={styles.text}>{sendTxnHash && <Text onPress={() => Linking.openURL(`https://alfajores-blockscout.celo-testnet.org/tx/${sendTxnHash}`)}>View Transaction ↗️</Text>}</Text>
            </View>

             {/* SMART CONTRACT */}
             <View style={styles.view}>
              <Text style={styles.header}>Contract Message</Text>
              <Text style={styles.info}>{message}</Text>
              <Text style={styles.header}>Update Message</Text>
              <TextInput style={styles.input} value={newMessage} onChangeText={text => setNewMessage(text)} placeholder="New Message"></TextInput>
              <Pressable style={styles.button} onPress={() => updateContractMessage()} disabled={updateContractBtnDisabled}><Text style={styles.buttonText}>{updateContractBtnText}</Text></Pressable>
              <Text style={styles.text}>{updateContractTxnHash && <Text onPress={() => Linking.openURL(`https://alfajores-blockscout.celo-testnet.org/tx/${updateContractTxnHash}`)}>View Transaction ↗️</Text>}</Text>
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
