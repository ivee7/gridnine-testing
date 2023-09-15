import {
    INIT,
    PAGINATION,
    FILTERS_CHANGE_SORT,
    FILTERS_CHANGE_TRANSFER,
    FILTERS_CHANGE_AIRLINES,
    FILTERS_CHANGE_START_PRICE,
    FILTERS_CHANGE_END_PRICE,
} from '../actions/actionTypes'
import handleData, { Card } from "../../utils/handleData";
import data from '/dist/flights.json'

export interface stateInterface {
    filters: {
        startPrice: string,
        endPrice: string,
        transfer: Array<string>,
        sort: string,
        airlines: Array<string>
    },
    paginate: number
    unsortedCards: Card[]
    cards: Card[]
    companies: Array<string>
}

interface ActionInterface {
    type: string
    data: string
}

type filterReducerFunc = (state: stateInterface, action: ActionInterface) => stateInterface

const initialState: stateInterface = {
    filters: {
        startPrice: '',
        endPrice: '1000000',
        transfer: [],
        sort: 'PRICE_ASC',
        airlines: []
    },
    paginate: 4,
    unsortedCards: handleData(data.result.flights),
    cards: [],
    companies: [...new Set(handleData(data.result.flights).map((el: Card) => el.airline))],
}

function handleTransfers(arr: Card[], filters: stateInterface['filters']): Card[] {
    if (filters.transfer.includes('0') && filters.transfer.includes('1')) {
        return arr.filter(item => item.legs[0].transfers < 2 && item.legs[1].transfers < 2)
    } else if (filters.transfer.includes('0')) {
       return arr.filter(item => !(item.legs[0].transfers || item.legs[1].transfers))
    } else if (filters.transfer.includes('1')) {
        return arr.filter(item => item.legs[0].transfers === 1 && item.legs[1].transfers === 1)
    } else {
        return arr;
    }
}

const resetPagination = () => initialState.paginate

function filterCards(state: stateInterface) {
    let newStateCards = state.unsortedCards;

    newStateCards = newStateCards.filter(item => item.price >= +state.filters.startPrice && item.price <= +state.filters.endPrice)

    newStateCards = handleTransfers(newStateCards, state.filters);

    if (state.filters.airlines.length) {
        newStateCards = newStateCards.filter(item => state.filters.airlines.includes(item.airline))
    }

    if (state.filters.sort === 'PRICE_ASC') {
        newStateCards.sort((a, b) => a.price - b.price)
    } else if (state.filters.sort === 'PRICE_DESC') {
        newStateCards.sort((a, b) => b.price - a.price)
    } else if (state.filters.sort === 'TIME_ASC') {
        newStateCards.sort((a, b) => a.totalTime - b.totalTime)
    }

    return {
        ...state,
        cards: newStateCards,
        pagination: resetPagination()
    }
}


const filtersChangeAirlines: filterReducerFunc = (state, action) => {
    const { airlines } = state.filters;

    let newAirlines: string[];

    if (airlines.includes(action.data)) {
        newAirlines = airlines.filter(el => el !== action.data)
    } else {
        newAirlines = [...airlines, action.data]
    }

    return filterCards({
        ...state, filters: {...state.filters, airlines: newAirlines}
    })
}

const filtersChangeTransfer: filterReducerFunc = (state, action) => {
    const { transfer } = state.filters;

    let newTransfer: string[];

    if (transfer.includes(action.data)) {
        newTransfer = transfer.filter((el: string) => el !== action.data)
    } else {
        newTransfer = [...transfer, action.data]
    }

    return filterCards({
        ...state, filters: {...state.filters, transfer: newTransfer}
    })
}

const filtersChangeStartPrice: filterReducerFunc = (state, action) => {
    return filterCards({
        ...state, filters: {...state.filters, startPrice: action.data}
    })
}

const filtersChangeEndPrice: filterReducerFunc = (state, action) => {
    return filterCards({
        ...state, filters: {...state.filters, endPrice: action.data}
    })
}

const filtersChangeSort: filterReducerFunc = (state, action) => {
    return filterCards({
        ...state, filters: {...state.filters, sort: action.data}
    })
}

export default function filterReducer(state = initialState, action: ActionInterface) {
    switch (action.type) {
        case INIT:
            return filterCards(state)
        case FILTERS_CHANGE_SORT:
            return filtersChangeSort(state, action)
        case FILTERS_CHANGE_TRANSFER:
            return filtersChangeTransfer(state, action)
        case FILTERS_CHANGE_AIRLINES:
            return filtersChangeAirlines(state, action)
        case FILTERS_CHANGE_START_PRICE:
            return filtersChangeStartPrice(state, action)
        case FILTERS_CHANGE_END_PRICE:
            return filtersChangeEndPrice(state, action)
        case PAGINATION:
            return {
                ...state, paginate: state.paginate + +action.data
            }
        default:
            return filterCards(state)
    }
}
