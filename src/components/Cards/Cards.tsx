import { Card } from '../Card/Card'
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Cards.scss'
import { changePaginate } from '../../store/actions/filter';

export const Cards = () => {
    const {cards, paginate} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()

    const slicedArr = cards.slice(0, paginate)

    return (
        <ul className="cards">
            {slicedArr.map((flight, index) => (
                <li
                    key={index}
                    className="cards__item"
                >
                    <Card
                        price={flight.price}
                        currency={flight.currency}
                        airlineCode={flight.airlineCode}
                        legs={flight.legs}
                    />
                </li>
            ))}

            {slicedArr.length
                ? <button className='cards__button' onClick={() => dispatch(changePaginate('4'))}>Показать ещё</button>
                : <p className='cards__noinfo'>К сожалению, ничего не найдено :(</p>
            }
        </ul>
    )
}