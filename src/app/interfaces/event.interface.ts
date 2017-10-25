export interface Event {
    name: string,
    creator?: string,
    creatorName?: string,
    venue: string,
    date: string,
    description: string,
    attendees?: string[]
}