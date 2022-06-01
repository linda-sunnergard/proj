import { render } from '@testing-library/react-native';

import StationsList from "../components/home/StationsList";
import StationInfo from "../components/helpers/StationInfo";

import stationModel from "../models/stations.ts";

/*Use case: The user should be able to click a button for the station 'Arlanda C' and be navigated to the details page for the station.*/

const setStations = () => false;
const navigation = {
    navigate: jest.fn(),
};

jest.mock('stationModel')

const stations = [{ LocationSignature: "Arnc", AdvertisedLocationName: "Arlanda C", Geometry: "WGS84: POINT (17.928489392445165 59.64907212086778)"}]

const messages = [{ Header: "Banarbete", ExternalDescription: "27 maj (kl 22.00)-29 maj (kl 09.00) är det avstängt för tågtrafik på sträckan på grund av ett banarbete.", Geometry: "WGS84: POINT (16.578729939033 59.2069103781053)", StartDateTime: "2022-06-06T00:40:00.000+02:00", TrafficImpact: ["Arnc"] }]

const delayedTrains = [{ ActivityType: "Avgång", AdvertisedTimeAtLocation: "2022-05-28T15:35:00.000+02:00", EstimatedTimeAtLocation: "2022-05-28T16:00:00.000+02:00", Canceled: false, FromLocation: "Arnc", ToLocation: "Cst", AdvertisedTrainIdent: "123456789" }]

test("The user should be able to click a button for the station 'Arlanda C' and be navigated to the details page.", async () => {
    const { getByTestId } =
        render(<StationsList
            navigation={navigation}
            stations={stations}
            setStations={setStations}
            messages={messages}
            setMessages={setMessages}
        />);

    stationModel.getStations.mockResolvedValue(stations)

    const buttonId = "Arlanda C";
    const arlandaButton = await getByTestId(buttonId);
    expect(arlandaButton).toBeDefined();
    fireEvent.press(arlandaButton);
    expect(navigation.navigate).toHaveBeenCalled();

    const stationHeader = await getByText("Arlanda C");
    expect(stationHeader).toBeDefined();

    const messagesHeader = await getByText("Stationsmeddelanden");
    expect(messagesHeader).toBeDefined();

    const message = await getByText("27 maj (kl 22.00)-29 maj (kl 09.00) är det avstängt för tågtrafik på sträckan på grund av ett banarbete.")
    expect(message).toBeDefined();

    const delayedTrainsHeader = await getByText("Försenade tåg");
    expect(delayedTrainsHeader).toBeDefined();

    const delayedTrainID = await getByText("123456789");
    expect(delayedTrainID).toBeDefined();

});
