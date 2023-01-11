import React from 'react';
import { Link } from 'react-router-dom';
import linkedin from '../../img/linkedin.png';
import github from '../../img/github.png';
import LandStyles from './LandingPage.module.css';


const LandingPage = () => {
     
  return (
      <div className={LandStyles.subConteiner}>
        <div className={LandStyles.title}>Henry PI</div>
        <div className="">
          <div className={LandStyles.title}>Welcome to my Countries App</div>
          <Link to="/home">
            <button className={LandStyles.btnStart}>Start</button>
          </Link>
        </div>

        <div className={LandStyles.links}>
          <a
            href="https://www.linkedin.com/in/matias-carrizo-a9751b121/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="linkedin" className={LandStyles.linkedin} />
          </a>

          <a
            href="https://github.com/MatiCarrizo"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={github} alt="github" className={LandStyles.github} />
          </a>
        </div>
      </div>
  );
};         
export default LandingPage;

