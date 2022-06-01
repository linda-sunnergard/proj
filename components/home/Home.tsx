import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import trainTimes from '../../assets/train_times_logo3.png';
import Stations from './Stations';
import { Base, Typography } from '../../styles'

export default function Home({stations, setStations, delayedTrains, setDelayedTrains, messages, setMessages}) {


  return (
      <View style={{...Base.container}}>
        <View style={{...Base.center}}>
            <Image source={trainTimes} style={{ width: 172, height: 87}} />
        </View>
        <Stations
            stations={stations}
            setStations={setStations}
            delayedTrains={delayedTrains}
            setDelayedTrains={setDelayedTrains}
            messages={messages}
            setMessages={setMessages}
        />
      </View>
  );
};
