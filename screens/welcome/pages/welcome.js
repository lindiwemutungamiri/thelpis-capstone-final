import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import style from "../style";
import { Button } from "../../../components ";

export default function Welcome(props) {

    const { navigation } = props; //unpack navigation from props 
    const [visible, setVisible] = useState(false);   //creating a custom hook for setting buttons to be visible or not especially for the splash screen 


    //setting the stage for the splashscreen before we start showing the buttons  
    useEffect(() => {
        setTimeout(() => {
            setVisible(true);  //once the time is up set visible to true
        }, 2000);

    }, [])


    return (
        <SafeAreaView style={style.container} >
            <View style={style.mainView}>
                <Text style={style.textStyle}>Thelpis Wallet</Text>
                {visible && (
                    <View style={style.bottomView}>
                        <Button
                            text="Get Started" disabled={false}
                            btnStyle={style.btnStyle}
                            btnTextStyle={style.btnTextStyle}
                            onPress={() => navigation.navigate("CreateAccount")}

                        />
                        <Button
                            text="Sign In"
                            disabled={false}
                            onPress={() => navigation.navigate("Login")}
                            btnTextStyle={style.btnStyle2}
                        />

                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}