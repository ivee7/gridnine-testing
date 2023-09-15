import { Leg, generateLeg, totalTimeLegs } from "./generateLeg"

interface Flight {
    carrier: {
        uid: string,
        caption: string
        airlineCode: string
    }
    price: {
        total: {
            amount: string,
            currency: string,
            currencyCode: string
        },
        totalFeeAndTaxes: object,
        rates: object,
        passengerPrices: Array<object>
    }
    servicesStatuses: object
    legs: Leg[]
    exchange: object
    isTripartiteContractDiscountApplied: boolean
    international: boolean
    seats: Array<object>
    refund: object
}

export interface FlightCard {
    hasExtendedFare: boolean
    flight: Flight
    flightToken: string
}

export interface CardLeg {
    duration: number,
    departureAirportCode: string,
    departureAirpor: string,
    departureCity: string,
    departureDate: string,
    transfers: number,
    airline: string,
    airlineCode: string,
    arrivalAirportCode: string,
    arrivalAirport: string,
    arrivalCity: string,
    arrivalDate: string
}

export interface Card {
    airlineCode: string
    airline: string
    price: number
    currency: string
    legs: CardLeg[]
    totalTime: number
}

function handleData(data: FlightCard[]) {
    return data.map(({flight}) => {
        return {
            airlineCode: flight.carrier.airlineCode,
            airline: flight.carrier.caption,
            price: +flight.price.total.amount,
            currency: flight.price.total.currencyCode,
            legs: flight.legs.map(item => generateLeg(item)),
            totalTime: totalTimeLegs(flight.legs)
        }
    })
}

export default handleData;
