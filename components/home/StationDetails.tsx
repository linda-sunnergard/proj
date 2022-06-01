import StationInfo from "../helpers/StationInfo"

export default function StationDetails ({ route, navigation }) {
    const {
        station,
        delayedTrains,
        messages
    } = route.params

    return (
        <StationInfo
            station={station}
            delayedTrains={delayedTrains}
            messages={messages}
        />
    )
};
