export interface Event {
    id?: string,
    name: string,
    creator?: string,
    creatorName?: string,
    venue: string,
    date: string,
    description: string,
    attendees?: string[]
}