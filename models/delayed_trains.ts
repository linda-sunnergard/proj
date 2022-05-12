import config from "/../config/config.json";

const delayedTrainsModel = {
    getDelayedTrains: async function getDelayedTrains() {
        return fetch(`${config.base_url}delayed`)
            .then(response => response.json())
            .then(result => result.data)
    },
};

export default delayedTrainsModel;
