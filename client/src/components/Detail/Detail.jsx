import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from '../../redux/actions';
import DetailStyles from './Detail.module.css';



const Detail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
  }, [dispatch]);

  const myCountry = useSelector((state) => state.countryDetail);

  console.log(myCountry);
 
  return (
    <div >
      <div className={DetailStyles.conteiner}>
        <Link to='/Home'>
          <button className={DetailStyles.button} id='detailHome'>Home</button>
        </Link>
      </div>
      {
        myCountry.length > 0 ?
        <div className={DetailStyles.divSubcontainer}>
          <div className={DetailStyles.divCountry}>
            <h1>{myCountry[0].name}</h1>
            <img src={myCountry[0].flag_image} alt="Country" height="150px"/>
            <h3>ID: {myCountry[0].id}</h3>
            <h3>Continent: {myCountry[0].continent}</h3>
            <h3>Capital: {myCountry[0].capital}</h3>
            <h3>Subregion: {myCountry[0].subregion}</h3>
            <h3>Area: {myCountry[0].area} Km2</h3>
            <h3>Population: {myCountry[0].population}</h3>
          </div>
          <div className={DetailStyles.cardActivity}>
            {
              myCountry[0].activities.map((e) => (
                <div className={DetailStyles.divActivity}>
                  <h3>Activity: {e.name}</h3>
                  <h4>Difficulty: {e.difficulty}</h4>
                  <h4>Duration: {e.duration} hr</h4>
                  <h4>Season: {e.season}</h4>
                </div>
              ))}
          </div>
        </div> : <p className={DetailStyles.divLoading}>Loading...</p>
      }
    </div>
  );
};

export default Detail;