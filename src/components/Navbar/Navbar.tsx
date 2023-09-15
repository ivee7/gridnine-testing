import { useAppDispatch, useAppSelector } from '../../hooks';
import './Navbar.scss'
import { filtersChangeAirlines, filtersChangeEndPrice, filtersChangeSort, filtersChangeStartPrice, filtersChangeTransfer } from '../../store/actions/filter';

export const Navbar = () => {
    const companies = useAppSelector(state => state.filter.companies)
    const dispatch = useAppDispatch()

    return (
        <nav className='navbar'>
            <div className='navbar__block'>
                <h4 className='navbar__sub-title'>Сортировать</h4>

                <div className='navbar__columned'>
                    <label className='navbar__row' onClick={() => dispatch(filtersChangeSort('PRICE_ASC'))}>
                        <input type='radio' name='sort' defaultChecked />

                        <span> - по возрастанию цены</span>
                    </label>

                    <label className='navbar__row' onClick={() => dispatch(filtersChangeSort('PRICE_DESC'))}>
                        <input type='radio' name='sort' />

                        <span> - по убыванию цены</span>
                    </label>

                    <label className='navbar__row' onClick={() => dispatch(filtersChangeSort('TIME_ASC'))}>
                        <input type='radio' name='sort' />

                        <span> - по времени в пути</span>
                    </label>
                </div>
            </div>

            <div className='navbar__block'>
                <h4 className='navbar__sub-title'>Фильтровать</h4>

                <div className='navbar__columned'>
                    <label className='navbar__row'>
                        <input type='checkbox' onClick={() => dispatch(filtersChangeTransfer('1'))} />

                        <p>- 1 пересадка</p>
                    </label>

                    <label className='navbar__row'>
                        <input type='checkbox' onClick={() => dispatch(filtersChangeTransfer('0'))} />

                        <p>- без пересадок</p>
                    </label>
                </div>
            </div>

            <div className='navbar__block'>
                <h4 className='navbar__sub-title'>Цена</h4>


                <div className='navbar__columned'>
                    <label className='navbar__row'>
                        <p>От</p>

                        <input
                            className='navbar__input'
                            type='text'
                            onChange={(e) => dispatch(filtersChangeStartPrice(e.target.value))}
                            />
                    </label>

                    <label className='navbar__row'>
                        <p>До</p>

                        <input
                            className='navbar__input'
                            type='text'
                            onChange={(e) => dispatch(filtersChangeEndPrice(e.target.value))}
                            />
                    </label>
                </div>
            </div>

            <div className='navbar__block'>
                <h4 className='navbar__sub-title'>Авиакомпания</h4>

                <ul className='navbar__columned'>
                    {companies.map((item, index) => (
                        <li key={index}>
                            <div className='navbar__row'>
                                <input type='checkbox' onClick={() => dispatch(filtersChangeAirlines(item))}/>
                                <span>- {item}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
