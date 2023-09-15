export const currenciesMap = (code: string) => {
    switch (code) {
        case 'RUB':
            return '₽'
        default:
            return 'UNKNOWN CURRENCY'
    }
}
