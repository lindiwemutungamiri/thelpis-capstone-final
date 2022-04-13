import * as React from 'react';
import { Text, View, Image,StyleSheet,SafeAreaView, ScrollView, TextInput, Pressable, Linking, ImageBackground, TouchableOpacity, Clipboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogoutScreen } from './screens';
import { Welcome } from './screens';
import { Login } from './screens';
import Home from './components /Home';
import Portfolio from './components /Portfolio';
import Prices from './components /Prices';
import Transfer from './components /Transfer';
import Settings from './components /Settings';
import RootNavigation from './navigation/RootNavigation';
import style from './screens/welcome/style';
import Button from './components /Button/Button';
  //hiding the title of the screen 
  const screenOptions = {
    headerShown: false,
    
};

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator(); //creating the stack 
const Stack = createStackNavigator(); //creating the stack 


function renderHeader (){
    return (
        <View>
            <Image
                style={{ width: 300, height: 220 }}
                source={require("./assets/icons/ethdoor.png")}
            />
        </View>
    
    )

}

function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                 {renderHeader()}
             </View>
             <Text style={{ fontSize: 20, fontWeight: "600", paddingTop: 20 }}>Do you want to Log out?</Text>
               <View style={{paddingTop: 20}}>
                    <Button
                        text="Logout"
                        disabled={false}
                        btnTextStyle={style.btnTextStyle3}
                        onPress={() => navigation.navigate("Details")}
                        options={{tabBarStyle: { display: "none" }, }}

                    />
                </View>
                <View style={{paddingTop: 20}}>
                      <Button
                        text="Stay Logged In"
                        disabled={false}
                        btnTextStyle={style.btnTextStyle4}
                        onPress={() => navigation.navigate("Home")}
                        options={{tabBarStyle: { display: "none" }, }}

                    />
                      </View>
         
        {/* <View style={{flexDirection: "row", paddingTop: 20}}>
            <Button 
            style={styles.buttonText}
            title="No"
            onPress={() => navigation.navigate('Home')}
            options={{tabBarStyle: { display: "none" }, }}
            />
            <Button
            style={styles.buttonText}
            title="Yes"
            onPress={() => navigation.navigate('Details')}
            options={{tabBarStyle: { display: "none" }, }}
            />
        </View> */}
        
      </View>
    );
  }

  function DetailsScreen() {
    return (
        <RootNavigation/>
    
     
    );
  }

  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator screenOptions={screenOptions}>
        <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
        <SettingsStack.Screen name="Details" component={DetailsScreen} />
      </SettingsStack.Navigator>
    );
  }


export default function Dashboard() {
    return (
        <NavigationContainer independent={true}>

            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                //tabBarShowIcon: false,
                tabBarStyle: {
                    position: "absolute",
                    elevation: 0,
                    backgroundColor: "white",
                    borderRadius: 15,
                    height: 90,
                },

            }}

            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={require("./assets/icons/home.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                        tintColor: focused ? "blue" : "gray",

                                    }}
                                />
                                <Text
                                    style={{ color: focused ? "blue" : "gray", fontSize: 10 }}
                                >
                                    Home
                                </Text>
                            </View>

                        ),
                    }}
                />
                <Tab.Screen
                    name="Portfolio"
                    component={Portfolio}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={require("./assets/icons/Portfolio.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                        tintColor: focused ? "blue" : "gray",

                                    }}
                                />
                                <Text
                                    style={{ color: focused ? "blue" : "gray", fontSize: 10 }}
                                >
                                    Portfolio
                                </Text>
                            </View>

                        ),
                    }}
                />
                <Tab.Screen
                    name="Transfer"
                    component={Transfer}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={require("./assets/icons/Transfer.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 40,
                                        height: 40,
                                        tintColor: focused ? "blue" : "gray",

                                    }}
                                />

                            </View>

                        ),
                    }}
                />
                <Tab.Screen
                    name="Prices"
                    component={Prices}
                    options={{

                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={require("./assets/icons/Prices.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                        tintColor: focused ? "blue" : "gray",

                                    }}
                                />
                                <Text
                                    style={{ color: focused ? "blue" : "gray", fontSize: 10 }}
                                >
                                    Markets
                                </Text>
                            </View>

                        ),
                    }}
                />
          
                <Tab.Screen
                    name="Logout"
                    component={SettingsStackScreen}
                    options={{
                        tabBarStyle: {display: "none"},
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={require("./assets/icons/logouticon.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 17,
                                        height: 17,
                                        tintColor: focused ? "blue" : "gray",

                                    }}
                                />
                                <Text
                                    style={{ color: focused ? "blue" : "gray", fontSize: 10 }}
                                >
                                    LogOut
                                </Text>
                            </View>

                        ),
                    }}
                />
              
            </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    image: {
        height: 250,
        width: 150,
        marginTop: 40,
    },
    title: {
        fontSize: 21,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: .5,
    },
    subTitle: {
        fontSize: 17,
        marginBottom: 24,
        color: colors.subtitle,
    }
});