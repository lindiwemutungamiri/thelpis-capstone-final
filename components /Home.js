import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, } from 'react-native';
import colors from '../resources/colors';
import Button from './Button/Button'
import style from '../screens/welcome/style';
import { useSelector, useDispatch } from 'react-redux';


import { WatchlistState } from './store/reducers/watchlist';
import { TopmoversState } from './store/reducers/topmovers';
import { NewsState } from './store/reducers/news';

import * as watchListActions from './store/actions/watchlist';
import * as topmoversActions from './store/actions/topmovers';
import * as newsActions from './store/actions/news';

import Watchlist from './Watchlist';
import TopMoversList from './TopMoversList';
import NewsList from './NewsList';

interface RootState {
    watchlist: WatchListState;
    topmovers: TopmoversState;
    news: NewsState;
}




const Home = ({ navigation }: Props) => {


    const watchlistData = useSelector(
        (state: RootState) => state.watchlist.watchlistData)

    const topMoversData = useSelector(
        (state: RootState) => state.topmovers.topMoversData)

    const newsData = useSelector(
        (state: RootState) => state.news.newsData)




    const dispatch = useDispatch();

    const loadData = () => {
        try {
            dispatch(watchListActions.fetchCoinData());
            dispatch(topmoversActions.fetchTopMoversData());
            dispatch(newsActions.fetchNewsData());


        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        loadData();
    }, []);

    const viewMoreHandler = () => {
        navigation.navigate('News');

    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 100 }}>
                <Image
                    style={{ width: 300, height: 220 }}
                    source={require("../assets/icons/Thelpis.png")}

                />
                <Text style={{ fontSize: 20, fontWeight: "600", paddingTop: 10 }}>Welcome to the Thelpis Wallet</Text>
                <Text style={{ fontSize: 16, fontWeight: "300", color: "#5d616d", paddingTop: 10 }}>Make your first crypto investment today</Text>
                <View style={{ paddingTop: 30 }}>
                    <Button
                        text="Receive Crypto"
                        disabled={false}
                        btnTextStyle={style.btnTextStyle2}
                        onPress={() => navigation.navigate("Transfer")}

                    />
                    <View style={{ paddingHorizontal: 1 }}>
                        <Watchlist coinData={watchlistData} />
                    </View>
                    <View>
                        <TopMoversList coinData={topMoversData} />
                    </View>
                    <View>
                        <NewsList newsData={newsData} />

                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export const screenOptions = () => {
    return {
        headerShown: false,
    };
};

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

export default Home;