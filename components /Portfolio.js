import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView, ScrollView, Text, View, TextInput, Pressable, Linking, FlatfList, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {magic, web3} from '../screens/MagicLogin/magic';
import {Login} from '../screens/auth/pages/Login/Login';
import { abi } from '../screens/MagicLogin/contract/abi';
import * as Clipboard from 'expo-clipboard';
import Button from './Button/Button';
import colors from '../resources/colors';

import { useSelector, useDispatch } from 'react-redux';
import TopMovers from './TopMoversList';
import { TopmoversState } from './store/reducers/topmovers';
import * as topmoversActions from './store/actions/topmovers';
import TopMoversList from './TopMoversList';

interface RootState {
    topmovers: TopmoversState;
}



const Portfolio = () => {

    const topMoversData = useSelector(
        (state: RootState) => state.topmovers.topMoversData)


        const loadData = () => {
            try {
                dispatch(topmoversActions.fetchTopMoversData());
    
    
            } catch (err) {
                console.log(err);
            }
        }
        useEffect(() => {
            loadData();
        }, []);
    
       
    

   
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [balance, setBalance] = useState('...');
    const [transactions, setTransactions] = useState('...');

    const fetchBalance = (address) => {
        web3.eth.getBalance(address).then(bal => setBalance(web3.utils.fromWei(bal)))

      }

    //   Fetch Transactions

    const fetchTransactions = (address) =>{
        web3.eth.getTransaction(address).then(trans => setTransactions(web3.utils.fromWei(trans)))

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

      const [copiedText, setCopiedText] = useState('');

      const copyToClipboard = () => {
          Clipboard.setString(user.publicAddress);
  
      };
  
  
      const fetchCopiedText = async () =>{
          const text = await Clipboard.getStringAsync();
          setCopiedText(user.publicAddress);
  
      }
      const [CopyAddressBtnText, setCopyAddressBtnText] = useState('Receive Crypto');
     const [copyBtnDisabled, setcopyBtnDisabledBtnDisabled] = useState(false);

      const [DisplayAddressBtnText, setDisplayAddressBtnText] = useState('Display Copied Address');
      const [DisplayAddressBtnDisabled, setDisplayAddressBtnDisabled] = useState(false);

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

                        <View
                        style = {{color: "white", paddingTop: 50}}
                      
                        >
                        <TopMoversList coinData={topMoversData} />
                        </View>
                    
                    
                    

                  </ImageBackground>
                

              </View>
          )

      }

      function renderNotice() {
          return (
              <View
              style = {{
                alignItems: "center",
                marginTop: 220,
                marginHorizontal: 14,
                paddingVertical: 7,
                paddingHorizontal: 15,
                backgroundColor: colors.primaryBlue,
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

              >
                  <Text style={{color: "white", fontSize: 20}}>Investing Safety</Text>
                  <Text style={{color: "white", marginTop: 10,  fontSize: 13}}>To receive Crypto, please click on the Receive Crypto button below. 
                      Then send the copied address to the user trying to send you crypto. 
                      Note: Only send Ethereum to this wallet address. 
                  </Text>
              </View>
          )

      }


    return (
        <SafeAreaView>
            <ScrollView>
             <View>
                 {renderHeader()}
             </View>
          

             
         <View>
         <View 
        
         >
             {renderNotice()}
         </View>
             
              <View style = {{paddingTop: 8 ,paddingVertical: 20, paddingBottom: 20}}>
              <TouchableOpacity style={styles.button} onPress={() => copyToClipboard()} disabled={copyBtnDisabled}><Text style={styles.buttonText}>{CopyAddressBtnText}</Text></TouchableOpacity> 

              </View>
              <View style = {{paddingTop: 8 ,paddingVertical: 20, paddingBottom: 60}}>

              </View>

         </View>
        
         </ScrollView>
          
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
    PortfolioContainer: {
    width: "90%",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colors.border,
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 5,
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
        fontWeight: '600',
        marginTop: 60,
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
    copiedText:{
        marginTop: 10,
        color: "red",

    },
});
