import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '../../../components ';


export default function Login() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>
                        Sign In To Thelpis
                    </Text>
                </View>
                <View>
                    <Button text="Sign In" disabled={false} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}