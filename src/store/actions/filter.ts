import {
    INIT,
    FILTERS_CHANGE_SORT,
    FILTERS_CHANGE_TRANSFER,
    FILTERS_CHANGE_AIRLINES,
    FILTERS_CHANGE_START_PRICE,
    FILTERS_CHANGE_END_PRICE,
    PAGINATION,
} from './actionTypes'

export function initCards() {
  return {
    type: INIT,
    data: ''
  }
}

export function changePaginate(data: string) {
  return {
    type: PAGINATION,
    data
  }
}

export function filtersChangeSort(data: string) {
  return {
    type: FILTERS_CHANGE_SORT,
    data
  }
}

export function filtersChangeTransfer(data: string) {
  return {
    type: FILTERS_CHANGE_TRANSFER,
    data
  }
}

export function filtersChangeAirlines(data: string) {
  return {
    type: FILTERS_CHANGE_AIRLINES,
    data
  }
}

export function filtersChangeStartPrice(data: string) {
  return {
    type: FILTERS_CHANGE_START_PRICE,
    data
  }
}

export function filtersChangeEndPrice(data: string) {
  return {
    type: FILTERS_CHANGE_END_PRICE,
    data
  }
}
