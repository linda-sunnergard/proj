export default interface Message {
    header: string,
    external_description: string,
    geometry: Geometry,
    start_date_time: string,
    traffic_impact: Array<TrafficImpact>,
};
