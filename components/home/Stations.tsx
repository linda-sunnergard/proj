import { Text, View } from 'react-native';
import { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StationsList from "./StationsList";
import StationDetails from "./StationDetails";

import { Base, Typography } from '../../styles';

const Stack = createNativeStackNavigator();

export default function Stations({stations, setStations, delayedTrains, setDelayedTrains, messages, setMessages}) {

    return (
        <Stack.Navigator initialRouteName="List" screenOptions={({
            headerShown: false,
            })}>
            <Stack.Screen name="List">
                {props => <StationsList {...props}
                stations={stations}
                setStations={setStations}
                delayedTrains={delayedTrains}
                setDelayedTrains={setDelayedTrains}
                messages={messages}
                setMessages={setMessages}/>}
            </Stack.Screen>
           <Stack.Screen name="Details" component={StationDetails}/>
        </Stack.Navigator>
    );
};
