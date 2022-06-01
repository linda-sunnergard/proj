import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Picker } from '@react-native-picker/picker';

import { Base, Typography } from '../../styles';
import trainTimes from '../../assets/train_times_logo3.png';

import delayedTrainsModel from "../../models/delayed_trains";
import stationModel from "../../models/stations";
import StationInfo from "../helpers/StationInfo"
import Button from "../helpers/Button";
import PickTrain from "./PickTrain";

export default function TrainMap({stations, setStations, delayedTrains, setDelayedTrains, messages, setMessages}) {
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null)
    const [message, setMessage] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null)
    const [selectedTrain, setSelectedTrain] = useState();

    useEffect(() => {
        setUp()
    }, []);

    async function setUp() {
        setStations(await stationModel.getStations());
        setDelayedTrains(await delayedTrainsModel.getDelayedTrains());
    }

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== "granted") {
                setMessage("Permission to access location was denied");
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setCurrentLocationMarker(<Marker
                key="userCoord"
                coordinate={{latitude: currentLocation.coords.latitude,
                             longitude: currentLocation.coords.longitude}}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function DelayMarkers() {
        const filteredStations = stations.filter(station => {
            let stationsTrains = delayedTrains.filter(
                delayedTrain => delayedTrain.FromLocation?.[0].LocationName === station.LocationSignature);
            return stationsTrains.length > 0;
        });
        return filteredStations
            .map((station, index) => {
                    let position = station.Geometry.WGS84.replace("POINT (", "").replace(")", "").split(" ");
                    return <Marker
                        key={index}
                        coordinate = {{
                            latitude: Number(position[1]),
                            longitude: Number(position[0])
                        }}
                        title = { station.AdvertisedLocationName }
                        onPress = {() => {
                                setSelectedStation(station)
                            }
                        }
                    />
            });
    }

    function getTrainList() {
        const stationSignature = selectedStation?.LocationSignature

        const delayedTrainsAtSelectedStation = delayedTrains.filter(delayedTrain =>
            delayedTrain.FromLocation?.[0].LocationName === stationSignature);

        let delayedTrainsNoRepeat = [];

        delayedTrainsAtSelectedStation.forEach(train => {
            if(!delayedTrainsNoRepeat.some(checkThisTrain => checkThisTrain.AdvertisedTrainIdent === train.AdvertisedTrainIdent)) {
                delayedTrainsNoRepeat.push(train)
            }
        });

        if(selectedTrain == null) {
            setSelectedTrain(delayedTrainsNoRepeat?.[0])
        }

        return delayedTrainsNoRepeat
    }
    
    function calculateMinutes(advertisedTimeAtLocation, estimatedTimeAtLocation) {
        let adTimeObject = new Date(advertisedTimeAtLocation);
        let estTimeObject = new Date(estimatedTimeAtLocation);
        let timeDiff =  estTimeObject - adTimeObject;
        const timeDiffWithLeeway = timeDiff - 5;

        return toMinutes(timeDiffWithLeeway);
    };

    function toMinutes(time) {

        return Math.floor((time / 1000) / 60);
    };

    function CreateCircle({selectedTrain, selectedStation}) {
        if (selectedTrain != null) {
            let positionOfSelectedStation = selectedStation.Geometry.WGS84.replace("POINT (", "").replace(")", "").split(" ");

            const time = calculateMinutes(selectedTrain.AdvertisedTimeAtLocation, selectedTrain.EstimatedTimeAtLocation);

            const walkingDistance = time * 100;

            return (
                    <Circle
                        center={{
                            latitude: Number(positionOfSelectedStation[1]),
                            longitude: Number(positionOfSelectedStation[0])
                        }}
                        radius={walkingDistance}
                    />
            )
        } else {
            return null
        }
    };

    return (
        <View style={mapStyle.container}>
            <View style={{...Base.row}}>
            <Text style={{...Typography.header2}}>Försenade tåg</Text>
                <Image source={trainTimes} style={{ width: 137, height: 52}} />
            </View>

            <View style={mapStyle.container}>
                <MapView
                    style={mapStyle.map}
                    initialRegion={{
                        latitude: 59.326559,
                        longitude: 18.07022,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}>
                    <DelayMarkers/>
                    {currentLocationMarker}
                    {selectedTrain != null &&
                        <CreateCircle
                            selectedTrain={selectedTrain}
                            selectedStation={selectedStation}
                        />
                    }
                </MapView>
            </View>
            {selectedStation != null &&
                <View style={mapStyle.container}>
                    <Button
                        title="Stäng fönster"
                        onPress ={() => {
                            setSelectedStation(null)
                            setSelectedTrain(null)
                        }}
                    />
                    <Text style={{...Typography.normal}}>Hur långt kan jag gå innan mitt tåg kommer?</Text>
                    <PickTrain
                        stationTrainList={getTrainList()}
                        selectedTrain={selectedTrain}
                        setSelectedTrain={setSelectedTrain}
                    />
                    <StationInfo
                        station={selectedStation}
                        delayedTrains={delayedTrains}
                        messages={messages}
                    />
                </View>
            }
        </View>
    );
};

const mapStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
