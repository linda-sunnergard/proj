import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from "react-native";
import Button from "../helpers/Button";

import stationModel from "../../models/stations";
import messageModel from "../../models/messages";
import delayedTrainsModel from "../../models/delayed_trains";

import { Base, Typography, Forms } from '../../styles';

export default function StationsList({route, navigation, stations, setStations, delayedTrains, setDelayedTrains, messages, setMessages}) {
    const [stationPageCount, setStationPageCount] = useState(0)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        reloadStations();
    }, []);

    async function reloadStations() {
        returnedStations = await stationModel.getStations()
        setStations(returnedStations)
        setSearchResult(returnedStations)
    }

    async function getMessagesAndDelays() {
        setMessages(await messageModel.getAllMessages());
        setDelayedTrains(await delayedTrainsModel.getDelayedTrains());
    }


    function getPage(currentPage: number) : Array<Stations> {
        return searchResult.slice(currentPage*10, (currentPage+1)*10);
    }

    const maxPages = Math.floor(searchResult.length / 10);

    const listOfStations = getPage(stationPageCount)
            .map((station, index) => {
                return <Button
                    title={station.AdvertisedLocationName}
                    key={index}
                    testID={station.AdvertisedLocationName}
                    onPress={() => {
                        getMessagesAndDelays();
                        navigation.navigate('Details', {
                            station: station,
                            delayedTrains: delayedTrains,
                            messages: messages
                        });
                    }}
                />
            });

    async function searchForStations(searchContent: string) {
        setSearchResult(stations.filter(station => station.AdvertisedLocationName.includes(searchContent)));
    };

    return (
        <View style={{...Base.container}}>
            <View>
                <TextInput
                style={{ ...Forms.input }}
                testID={"Station search field"}
                placeholder="Vilken station letar du efter?"
                onChangeText={(content: string) => {
                    searchForStations(content)
                    setStationPageCount(0)
                }}
                />
            </View>
            <ScrollView contentContainerStyle={[
                Base.container,
                {
                    justifyContent: 'space-around',
                    height: "93%",
                }
            ]}>
                {listOfStations}
            </ScrollView>
            <View style={{
                flexDirection: "row",
                justifyContent: 'space-around',
                height: "6%",
                }}>
                <Button
                    style={{
                        width: "40%",
                        margin: "auto"
                    }}
                    title="Föregående sida"
                    onPress={() => {
                        setStationPageCount(stationPageCount === 0
                                            ? maxPages
                                            : stationPageCount-1)
                    }}
                />
                <Button
                    style={{
                        width: "40%",
                    }}
                    title="Nästa sida"
                    onPress={() => {
                            setStationPageCount(stationPageCount === maxPages
                                                ? 0
                                                : stationPageCount+1)
                    }}
                />
            </View>
        </View>
    );
}
