import React, { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import DraggableFlatList, { RenderItemParams, } from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

import WatchlistItem from "./WatchlistItem";
import * as watchListActions from './store/actions/watchlist';
import Coin from "../models/Coin";
import colors from "../resources/colors";

interface TopMoversProps {
    coinData: Coin[];
}

const Watchlist: FC<TopMoversProps> = ({ coinData }) => {
    const dispatch = useDispatch();

    const renderItem = useCallback(
        ({ item, drag, isActive }: RenderItemParams<Coin>) => {
            return (
                <WatchlistItem
                    id={item.id}
                    name={item.name}
                    symbol={item.symbol}
                    price={item.price}
                    percentChange={item.percentChange}
                    drag={drag}
                    isActive={isActive}
                />
            )
        }, [])


    return (
        <View>
            <Text style={styles.watchlistText}>Watchlist</Text>
            <View style={styles.watchlistContainer}>
                <DraggableFlatList
                    data={coinData}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                    onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    onDragEnd={({ data }) => dispatch(watchListActions.updateCoinData(data))}
                    renderItem={renderItem}
                />
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    watchlistText: {
        fontSize: 21,
        fontWeight: '600',
        marginTop: 60,
        marginBottom: 10
    },
    watchlistContainer: {
        width: "97%",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: colors.border,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,
    }
})

export default Watchlist;
