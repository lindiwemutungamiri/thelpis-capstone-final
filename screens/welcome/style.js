import { StyleSheet } from "react-native";//allows us to build javascript objects that will apply our CSS to our components
import { RFValue } from "react-native-responsive-fontsize"; //will calculate based off of screen height 
import colors from "../../resources/colors";


/**
 * The style sheet that we will bring into out welcome page
 * Creating CSS objects in JavaScript format that allows us to style Thelpis 
 */

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBlue,
    },
    mainView: {
        flex: 1, //takes up the entire screen 
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        color: colors.gold,
        fontWeight: "bold",
        fontSize: RFValue(35),    //calculates our font based on the screen size 

    },
    btnStyle: {
        backgroundColor: colors.white,
    },
    btnStyle2: {
        marginTop: 20,

    },
    btnTextStyle: {
        color: colors.primaryBlue,
    },
    btnTextStyle2: {
        color: colors.gold,
        alignContent: "center",
        alignItems: "center",
        paddingRight: 80,
    },
    bottomView: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },


});
