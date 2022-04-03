import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import ListItem from './ListItem';
import {SAMPLE_DATA} from '../components /data/sampleData';
import {
    BottomSheetModal,
    BottomSheetModalProvider,

  } from '@gorhom/bottom-sheet';
 
import Chart from './Chart';  
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getMarketData } from '../services/cryptoService';

const ListHeader = () => (
    <>
      <View style={styles.titleWrapper}>
          <Text style={styles.largeTitle}>Markets</Text>
        </View>
      <View style={styles.divider} />
    </>
  )

const Prices = () => {

  const [data, setData] = useState([]);

    const [selectedCoinData, setSelectedCoinData] = useState(null);

    useEffect(() => {
      const fetchMarketData = async () => {
        const marketData = await getMarketData();
        setData(marketData);
      }
  
      fetchMarketData();
    }, [])


    const bottomSheetModalRef = useRef(null);

    const snapPoints = useMemo(() => ['45%'], []);
  
    const openModal = (item) => {
      setSelectedCoinData(item);
      bottomSheetModalRef.current?.present();
    }

    return (
        <BottomSheetModalProvider>
        
        <SafeAreaView style = {styles.container}>
            <FlatList
           keyExtractor={(item) => item.id}
           data={data}
           renderItem={({ item }) => (
            <ListItem
               name = {item.name}
               symbol = {item.symbol}
               currentPrice = {item.current_price}
               priceChangePercentage7d = {item.price_change_percentage_7d_in_currency}
               logoUrl = {item.image}
               onPress={() => openModal(item)}

               />
           )}
           ListHeaderComponent = {<ListHeader/>}
            />

        </SafeAreaView>  

        <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style = {styles.bottomSheet}
        >
          { selectedCoinData ? (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logoUrl={selectedCoinData.image}
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
            sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
        ) : null}
        </BottomSheetModal>

        </BottomSheetModalProvider> 
    );
}


export default Prices 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
     
    },
    titleWrapper: {
        marginTop: 40,
        paddingHorizontal: 16,

    },

    largeTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#89ABB1",
        marginHorizontal: 16,
        marginTop: 16,
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});