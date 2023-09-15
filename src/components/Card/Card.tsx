import { FC } from 'react'
import { CardLeg } from '../../utils/handleData'
import { handleDuration } from '../../utils/handleTime'
import { currenciesMap } from '../../utils/currencies'
import moment from 'moment'
import 'moment/dist/locale/ru'
import './Card.scss'

interface CardProps {
    price: number
    currency: string
    airlineCode: string
    legs: CardLeg[]
}

moment.locale('ru')

export const Card: FC<CardProps> = ({price, currency, airlineCode, legs}) => {

    return (
        <div className="card">
            <div className="card__header">
                <img
                    src={`https://www.skyscanner.net/images/airlines/small/${airlineCode}.png`}
                    alt={airlineCode}
                    className='card__header-img'
                />

                <div className='card__header-text'>
                    <p>{price} {currenciesMap(currency)}</p>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>

            <ul className='card__legs'>
                {
                    legs.map((item, index) => (
                        <li key={index} className='card__leg'>
                            <div className='card__leg-item'>
                                <p>{item.departureCity}, {item.departureAirpor} <span className='card__leg--blue-cl'>({item.departureAirportCode})</span></p>
                                <img src='/arrow.svg' className='card__leg-arrow' />
                                <p>{item.arrivalCity}, {item.arrivalAirport} <span className='card__leg--blue-cl'>({item.arrivalAirportCode})</span></p>
                            </div>

                            <div className='card__leg-item card__leg-item--justify'>
                                <p>
                                    {moment(item.departureDate).format('LT')}&nbsp;
                                    <span className='card__leg--blue-cl'>{moment(item.departureDate).format('D MMM dd')}</span>
                                </p>
                                <p className='card__leg-image-wrapper'><img src='/clock.svg' className='card__leg-image' />{handleDuration(item.duration)}</p>
                                <p>
                                    <span className='card__leg--blue-cl'>{moment(item.arrivalDate).format('D MMM dd')}</span>&nbsp;
                                    {moment(item.arrivalDate).format('LT')}
                                </p>
                            </div>

                            <div className='card__leg-item card__leg-transfer'>
                                {!!item.transfers && <p className='card__leg-transfer-text'>{item.transfers} пересадка</p>}
                                <div className='card__leg-transfer-line'/>
                            </div>

                            <div className='card__leg-item'>
                                <p>Рейс выполняет: {item.airlineCode} {item.airline}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>

            <button className="card__button">Выбрать</button>
        </div>
    )
}
