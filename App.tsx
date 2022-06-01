import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FlashMessage from "react-native-flash-message";
import { Station } from "./interface/station";
import { Message } from "./interface/message";
import { DelayedTrain } from "./interface/DelayedTrain";

import Home from "./components/home/Home";
import TrainMap from "./components/map/TrainMap";

import { Base, Typography } from './styles';

const Tab = createBottomTabNavigator();

export default function App() {
    const [stations, setStations] = useState<Array<Station>>([]);
    const [delayedTrains, setDelayedTrains] = useState<Array<DelayedTrain>>([]);
    const [messages, setMessages] =useState<Array<Message>>([]);

    return (
        <SafeAreaView style={{...Base.container}}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#ccc',
                    tabBarInactiveTintColor: '#000000',
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#083b66',
                    tabBarInactiveBackgroundColor: '#083b66',
                })}>
                    <Tab.Screen name="Stationer">
                        {() => <Home
                            stations={stations}
                            setStations={setStations}
                            delayedTrains={delayedTrains}
                            setDelayedTrains={setDelayedTrains}
                            messages={messages}
                            setMessages={setMessages}
                            />}
                    </Tab.Screen>
                    <Tab.Screen name="Karta">
                        {() => <TrainMap
                            stations={stations}
                            setStations={setStations}
                            delayedTrains={delayedTrains}
                            setDelayedTrains={setDelayedTrains}
                            messages={messages}
                            setMessages={setMessages}
                            />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
            <FlashMessage position="bottom" />
        </SafeAreaView>
    );
  }

    const routeIcons = {
        "Stationer": "train-sharp",
        "Karta": "map",
    };
