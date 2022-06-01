export default interface DelayedTrain {
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    EstimatedTimeAtLocation: string,
    Canceled: boolean,
    FromLocation: Location,
    ToLocation: Location,
    AdvertisedTrainIdent: string
};

export interface Location {
    LocationName: string,
};
