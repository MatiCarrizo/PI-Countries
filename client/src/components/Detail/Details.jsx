import React from "react";
import { Link } from "react-router-dom";
import DetailStyles from './Details.module.css';


const Detail = () => {
 
  return (
    <div className={DetailStyles.conteiner}>
      <Link to='/Home'>
        <button className={DetailStyles.button} id='detailHome'>Home</button>
      </Link>
    </div>
  );
};

export default Detail;