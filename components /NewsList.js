import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


import NewsListItem from './NewsListItem';
import News from '../models/News';
import colors from '../resources/colors';

interface NewsProps {
    newsData: News[];

}

const NewsList: FC<NewsProps> = ({
    newsData,

}) => {
    return (
        <View style={{ width: '100%', alignSelf: 'flex-start' }}>

            <View>
                <Text style={styles.newsText}>News </Text>
            </View>

            <View style={styles.newsListContainer}>

                <FlatList
                    data={newsData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.url}
                    style={{ marginHorizontal: 8 }}
                    renderItem={({ item }) => {
                        return (
                            <NewsListItem
                                newsOutlet={item.newsOutlet}
                                date={item.date}
                                title={item.title}
                                image={item.image}
                                url={item.url}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 10,
        marginHorizontal: '6%',
    },
    newsText: {
        fontWeight: '600',
        fontSize: 21,
        marginTop: 32,
        marginBottom: 10,
        marginLeft: '6%',
    },
    viewMoreButton: {
        color: colors.cbBlue,
        fontSize: 18,
        fontWeight: '600',
    },
    newsListContainer: {
        width: "97%",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: colors.border,
        backgroundColor: 'white',
        marginLeft: 5,
        marginRight: 5,

    }
});

export default NewsList;