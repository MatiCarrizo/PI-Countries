import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCountries, createActivity, searchCountry, filterByActivity } from '../../redux/actions';
import ActivityStyles from './CreateActivity.module.css';



const CreateActivity = () => {
    const dispatch = useDispatch();
    const countriesName = useSelector((state) => state.countries);
    const history = useHistory();

    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '',
        countryId: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // const handleCheck = (e) => {
    //     if (e.target.checked) {
    //         setInput({
    //             ...input,
    //             season: e.target.value
    //         })
    //     }
    // }

    const handleSelectDificulty = (e) => {
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }

    const handleSelectSeason = (e) => {
        setInput({
            ...input,
            season: e.target.value
        })
    }

    const handleSelectCountries = (e) => {
        setInput({
            ...input,
            countryId: [...input.countryId, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(createActivity(input))
        alert('Activity created')
        setInput({
            name: '', 
            difficulty: '', 
            duration: '', 
            season: '',
            countryId: []
        })
        history.push('/home');
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch]);

    return (
        <div >
            <div className={ActivityStyles.conteiner}>
                <Link to='/Home'>
                    <button className={ActivityStyles.button} id='detailHome'>Home</button>
                </Link>
            </div>
            <div>
                <h1>Create your Activity</h1>
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div>
                        <label>Name:</label>
                        <input onChange={handleChange} type="text" value={input.name} name='name' placeholder="Activity name"/>
                    </div>

                    <div>
                        <label>Difficulty:</label>
                        <select onChange={handleSelectDificulty}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div>
                        <label>Duration:</label>
                        <input onChange={handleChange} type="time" value={input.duration} name='duration' placeholder="Duration"/>
                    </div>

                    <div>
                        <label>Season:</label>
                        <select onChange={handleSelectSeason}>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                        {/* <label><input onChange={handleCheck} type='checkbox' name="verano" value='Verano'/>Verano</label>
                        <label><input onChange={handleCheck} type='checkbox' name="otoño" value='Otoño'/>Otoño</label>
                        <label><input onChange={handleCheck} type='checkbox' name="invierno" value='Invierno'/>Invierno</label>
                        <label><input onChange={handleCheck} type='checkbox' name="primavera" value='Primavera'/>Primavera</label> */}
                    </div>

                    <div>
                        <label>Country:</label>
                        <select onChange={handleSelectCountries}>
                            {countriesName.map((e) => (
                                <option value={e.id}>{e.name}</option>
                            ))}
                        </select>
                        <ul><li>{input.countryId.map(e => e + ', ')}</li></ul>
                    </div>

                    <div>
                        <button type="submit">Create Activity</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateActivity;