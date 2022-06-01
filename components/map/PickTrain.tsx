import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { View } from "react-native";

export default function PickTrain({stationTrainList, selectedTrain, setSelectedTrain}) {
    
    const pickerItems = stationTrainList.map((delayedTrain, index) => {
        return (
            <Picker.Item
                key={delayedTrain.AdvertisedTrainIdent}
                label={"Tågnummer: " + delayedTrain.AdvertisedTrainIdent}
                value={delayedTrain.AdvertisedTrainIdent}
            />
        )
    });

    return (
        <View>
            <Picker
                selectedValue={selectedTrain?.AdvertisedTrainIdent}
                onValueChange={(itemValue, itemIndex) => {
                        setSelectedTrain(stationTrainList.find(train => train.AdvertisedTrainIdent === itemValue));
                    }}>
                {pickerItems}
            </Picker>
        </View>
    )
};
