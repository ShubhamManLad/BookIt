export interface Event {
    eventId: number;
    title: string;
    description: string;
    type: string;
    date: Date;
    location: string;
    availableSeats: number;
    totalSeats: number;
    ticketPrice: number;
    selectedSeats: string;
}

export class EventRequest {
    title: string = '';
    description: string = '';
    type: string = '';
    date: string = '';
    location: string = '';
    availableSeats: number = 0;
    totalSeats: number = 0;
    ticketPrice: number = 0;
}

export interface Ticket{
    bookingName:string,
    eventId: number,
    seatNumber: string,
    bookingDate: Date,
    numPpl: number,
    paymentStatus: string,
    ticketPrice: number
}

export interface BookingResponse{
    ticketId: number,
    eventName: string,
    userId: number,
    bookingName:string,
    eventId: number,
    seatNumber: string[],
    numPpl: number,
    bookingDate: Date,
    paymentStatus: string,
    ticketPrice: number,
    rating: number,
    feedbackMsg:string,
}

export class Feedback{
    ticketId: number = 0;
    rating: number = 0;
    feedbackMsg: string = '';
}

export class Notification{
    email : string = '';
    eventId : number = 0;
}
