interface LegSegment {
    classOfServiceCode: string
    classOfService: object
    departureAirport: {
        uid: string,
        caption: string
    }
    departureCity: {
        uid: string
        caption: string
    }
    aircraft: object
    travelDuration: number
    arrivalCity: {
        uid: string
        caption: string
    }
    arrivalDate: string
    flightNumber: string
    techStopInfos: Array<object>
    departureDate: string
    stops: number
    servicesDetails: object
    airline: {
        uid: string
        caption: string
        airlineCode: string
    }
    starting: boolean
    arrivalAirport: {
        uid: string
        caption: string
    }
}

export interface Leg {
    duration: number
    segments: LegSegment[]
}

export function generateLeg(data: Leg) {
    const transfers = data.segments.length - 1;

    return {
        duration: data.duration,
        departureAirportCode: data.segments[0].departureAirport.uid,
        departureAirpor: data.segments[0].departureAirport.caption,
        departureCity: data.segments[0].departureCity?.caption || 'no info',
        departureDate: data.segments[0].departureDate,
        transfers: transfers,
        airline: data.segments[0].airline.caption,
        airlineCode: data.segments[0].airline.airlineCode,
        arrivalAirportCode: data.segments[transfers].arrivalAirport.uid,
        arrivalAirport: data.segments[transfers].arrivalAirport.caption,
        arrivalCity: data.segments[transfers].arrivalCity?.caption || 'no info',
        arrivalDate: data.segments[transfers].arrivalDate
    }
}

export function totalTimeLegs(data: Leg[]) {
    return data.reduce((acc, cur) => acc + cur.duration, 0);
}
