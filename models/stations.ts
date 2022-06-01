import config from "../config/config.json";
import Station from "../interfaces/station"

const stationModel = {
    getStations: async function getStations() : Array<Station> {
        return await fetch(`${config.base_url}/stations`)
            .then(response => response.json())
            .then(result => result.data)
            .then(result => result.sort((current, next) => current.AdvertisedLocationName > next.AdvertisedLocationName))
            .catch((err) => console.log(err));
        return result
    },
};

export default stationModel;
