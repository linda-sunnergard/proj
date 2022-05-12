export default interface DelayedTrains {
    activity_type: string,
    advertised_time_at_location: string,
    estimated_time_at_location: string,
    canceled: boolean,
    from_location: Array,
    to_location: Array,
}
