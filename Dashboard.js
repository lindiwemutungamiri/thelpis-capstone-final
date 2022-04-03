import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components /Home';
import Portfolio from './components /Portfolio';
import Prices from './components /Prices';
import Transfer from './components /Transfer';
import Settings from './components /Settings';

const Tab = createBottomTabNavigator();

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
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    source={require("./assets/icons/Settings.png")}
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
                                    Settings
                                </Text>
                            </View>

                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}