import config from "../config/config.json";

import stationModel from "./stations";
import { DelayedTrain } from "../interfaces/delayed_train";

const delayedTrainsModel = {
    getDelayedTrains: async function getDelayedTrains(): Array<DelayedTrain> {
        return fetch(`${config.base_url}/delayed`)
            .then(response => response.json())
            .then(result => result.data)
    },
};

export default delayedTrainsModel;
