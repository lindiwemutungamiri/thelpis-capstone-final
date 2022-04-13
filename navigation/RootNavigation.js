import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '../screens/welcome';
import { Login, CreateAccount } from '../screens/auth';
import Dashboard from '../Dashboard';
import Settings from '../components /Settings';
import OnboardingScreen from '../screens/OnboardingScreen';

//To get us from screen to screen
//Without this, we are going to be stuck on one screen forever
export default function RootNavigation() {
    const Stack = createStackNavigator(); //creating the stack 


    //hiding the title of the screen 
    const screenOptions = {
        headerShown: false,
    };

    //Creating the Screen stacks and passing in the imported components 

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Splash" component={Welcome} />
                <Stack.Screen name = "OnboardingScreen" component={OnboardingScreen}/>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Settings" component={Settings}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}




