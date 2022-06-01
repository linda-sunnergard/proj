export default interface Message {
    Header: string,
    ExternalDescription: string,
    Geometry: Geometry,
    StartDateTime: string,
    TrafficImpact: Array<TrafficImpact>,
};

export interface Geometry {
    WGS84: string,
};
