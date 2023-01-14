import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry } from '../../redux/actions';
import SearchStyles from './SearchBar.module.css'



const SearchBar = () => {
    const dispatch = useDispatch();

    const [country, setCountry] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setCountry(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchCountry(country));
    };


    return (
        <div>
            <input className={SearchStyles.input} type='text' placeholder=' Search Country...' onChange={(e) => handleChange(e)}/>
            <button className={SearchStyles.button} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;