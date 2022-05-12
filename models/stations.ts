import config from "/../config/config.json";

const stationModel = {
    getStations: async function getStations() {
        return fetch(`${config.base_url}stations`)
            .then(response => response.json())
            .then(result => result.data)
    },
};

export default stationModel;
