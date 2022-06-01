import { render } from '@testing-library/react-native';

import StationList from "../components/home/StationsList";

/*Use case: The user should be able to search for the station Stockholm Central and press the button.*/

const setStations = () => false;
const navigation = {
    navigate: jest.fn(),
};

// const searchResult = {"Stockholm Central"}

test("The user should be able to search for the station Stockholm Central and press the button.", async () => {
    const { getByTestId } =
        render(<StationList
            navigation={navigation}
            setStations={setStations}
        />);
});
