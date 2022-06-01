import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

import stationModel from "../../models/stations";
import messageModel from "../../models/messages";
import delayedTrainsModel from "../../models/delayed_trains";

import { Base, Typography } from '../../styles';

export default function StationInfo ({station, delayedTrains, messages}) {
    const stationSignature = station.LocationSignature

    const delayedTrainsAtStation =
        delayedTrains.filter(
            delayedTrain =>
                delayedTrain.FromLocation?.[0].LocationName === stationSignature
        );

    const messagesForStation =
        messages.filter(
            message =>
                message.TrafficImpact.some(
                    trafficImpact =>
                        trafficImpact.FromLocation?.includes(stationSignature) ||
                        trafficImpact.AffectedLocation?.includes(stationSignature) ||
                        trafficImpact.ToLocation?.includes(stationSignature)
        ));

    function getDateForm(date) {
        let dateObject = new Date(date)
        return dateObject.toLocaleTimeString("sv-SE")
    }

    function DelayedTrainTable() {
        return delayedTrainsAtStation.map(
        (delayedTrain, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{delayedTrain.AdvertisedTrainIdent}</DataTable.Cell>
                    <DataTable.Cell>{getDateForm(delayedTrain.AdvertisedTimeAtLocation)}</DataTable.Cell>
                    <DataTable.Cell>{getDateForm(delayedTrain.EstimatedTimeAtLocation)}</DataTable.Cell>
                </DataTable.Row>
        )});
    }

    function StationMessagesTable() {
        return messagesForStation.map(
        (message, index) => {
            return (
                <DataTable.Row key={index}>
                    <View><Text>{message.ExternalDescription}</Text></View>
                </DataTable.Row>
        )});
    }

    return (
        <ScrollView style={{...Base.container}}>
            <Text style={{...Typography.header2}}>{station.AdvertisedLocationName}</Text>
            {delayedTrainsAtStation.length > 0 &&
            <View>
                <Text style={{...Typography.header3}}>Försenade tåg</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Tågnummer</DataTable.Title>
                        <DataTable.Title>Aviserad avgångstid</DataTable.Title>
                        <DataTable.Title>Ny avgångstid</DataTable.Title>
                    </DataTable.Header>
                    <DelayedTrainTable/>
                </DataTable>
            </View>}
            {delayedTrainsAtStation.length === 0 && messagesForStation.length === 0 &&
                <Text style={{...Typography.header3}}>Inga stationsmeddelanden eller försenade tåg</Text>
            }

            {messagesForStation.length > 0 &&
            <View>
                <Text style={{...Typography.header3}}>Stationsmeddelanden</Text>
                <DataTable>
                    <StationMessagesTable/>
                </DataTable>
            </View>}
        </ScrollView>
    )
};
