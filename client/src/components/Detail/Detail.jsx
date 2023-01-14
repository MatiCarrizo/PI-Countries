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

  // const params = useParams();

  // useEffect(() => {
  //     dispatch(getCountryDetail(params.id));
  //   }, [params.id]);

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
        <div>
          <div>
            <h1>Country: {myCountry[0].name}</h1>
            <h3>Continent: {myCountry[0].continent}</h3>
            <h3>Capital: {myCountry[0].capital}</h3>
            <h3>Subregion: {myCountry[0].subregion}</h3>
            <h3>Area: {myCountry[0].area}</h3>
            <h3>Population: {myCountry[0].population}</h3>
            <img src={myCountry[0].flag_image} alt="Country" height="300px"/>
          </div>
          <div>
            {
              myCountry[0].activities.map((e) => (
                <div>
                  <h4>Activity: {e.name}</h4>
                  <h5>Difficulty: {e.difficulty}</h5>
                  <h5>Duration: {e.duration}</h5>
                  <h5>Season: {e.season}</h5>
                </div>
              ))}
          </div>
        </div> : <p>Loading...</p>
      }
    </div>
  );
};

export default Detail;