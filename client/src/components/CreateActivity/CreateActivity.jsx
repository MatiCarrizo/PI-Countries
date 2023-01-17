import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCountries, createActivity } from '../../redux/actions';
import ActivityStyles from './CreateActivity.module.css';


const reload = () => {
    window.location.reload(false);
}



const validate = (input) => {
    let errors = {};
    if (!input.name || !/^[a-zA-Z\s]*$/.test(input.name) || input.name.length < 3 || input.name.length >= 25) errors.name = 'Has to contain at least 3 letters, at most 25 letters and must be all letters'; //Name of activity is required o invalid
    if (!input.difficulty) errors.difficulty = 'Difficulty is required';
    if (!input.duration) errors.duration = 'Duration is required';
    if (!input.season) errors.season = 'Season is required';
    if (input.countryId.length < 1) errors.countryId = 'Countries where the activity is carried out is required';
    return errors;
}

const CreateActivity = () => {
    const dispatch = useDispatch();
    const countriesName = useSelector((state) => state.countries);

    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '',
        countryId: []
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectDificulty = (e) => {
        setInput({
            ...input,
            difficulty: e.target.value
        })
        setErrors(validate({
            ...input,
            difficulty: e.target.value
        }))
    }

    const handleSelectSeason = (e) => {
        setInput({
            ...input,
            season: e.target.value
        })
        setErrors(validate({
            ...input,
            season: e.target.value
        }))
    }

    const handleSelectCountries = (e) => {
        setInput({
            ...input,
            countryId: [...input.countryId, e.target.value]
        })
        setErrors(validate({
            ...input,
            countryId: [...input.countryId, e.target.value]
        }))
    }    

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(input));
        const errorSave = validate(input);
        if (Object.values(errorSave).length !== 0) alert("You must fullfill all the required conditions");
        else {
            dispatch(createActivity(input))
            alert('Activity created')
            setInput({
                name: '', 
                difficulty: '', 
                duration: '', 
                season: '',
                countryId: []
            })
        }
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
            <div className={ActivityStyles.formConteiner}>
                <h1>Create your Activity</h1>
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div className={ActivityStyles.form}>
                        <div>
                            <div className={ActivityStyles.divSelect}>
                                <label>Name: </label>
                                <input onChange={handleChange} type="text" value={input.name} name='name' placeholder="Activity name"/>
                            </div >
                            <div className={ActivityStyles.errorDetail}>
                                {errors.name && <p className={ActivityStyles.errorDetailName}>{errors.name}</p>}
                            </div>
                        </div>

                        <div>
                            <div className={ActivityStyles.divSelect}>
                                <label>Difficulty: </label>
                                <select onChange={handleSelectDificulty}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className={ActivityStyles.errorDetail}>
                                {errors.difficulty && <p>{errors.difficulty}</p>}
                            </div>
                        </div>

                        <div>
                            <div className={ActivityStyles.divSelect}>
                                <label>Duration: </label>
                                <input onChange={handleChange} type="time" value={input.duration} name='duration' placeholder="Duration"/>
                            </div>
                            <div className={ActivityStyles.errorDetail}>
                                {errors.duration && <p>{errors.duration}</p>}
                            </div>
                        </div>

                        <div>
                            <div className={ActivityStyles.divSelect}>
                                <label>Season: </label>
                                <select onChange={handleSelectSeason}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Autumn">Autumn</option>
                                    <option value="Winter">Winter</option>
                                    <option value="Spring">Spring</option>
                                </select>
                            </div>
                            <div className={ActivityStyles.errorDetail}>
                                {errors.season && <p>{errors.season}</p>}
                            </div>
                        </div>

                        <div>
                            <div className={ActivityStyles.divSelect}>
                                <label>Country: </label>
                                <select onChange={handleSelectCountries}>
                                    <option value="" disabled selected>Select al least one</option>
                                    {countriesName.map((e) => (
                                        <option value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={ActivityStyles.errorDetail}>
                                {errors.countryId && <p className={ActivityStyles.errorCountry}>{errors.countryId}</p>}
                            </div>
                            {/* <ul><p>{input.countryId.map(e => e + ', ')}</p></ul> */}
                            <ul className={ActivityStyles.nameDetail}><p>{input.countryId.map(e => countriesName.map(el => {
                                if (el.id === e) { 
                                    console.log(el.name);
                                    return el.name + ', ';
                                }
                            }))}</p></ul>
                        </div>

                    </div>

                    <div>
                        <button className={ActivityStyles.buttonCreate} type="submit">Create Activity</button>
                    </div>
                </form>
            </div>
            <div>
                <button className={ActivityStyles.button} onClick={reload}>Reload</button>
            </div>
        </div>
    )
}

export default CreateActivity;