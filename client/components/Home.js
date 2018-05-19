import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=> {
  return (
    <div>
      <center>
        <h1>&#127925; Dancing Machine App &#127925;</h1>
        <img src={ '/images/roboCop1.jpg' } />
        <br />
        <br />
        <Link to='/images/dancers'className="btn btn-outline-dark"><h2> Choose Your Dancer &#128378;</h2></Link>
      </center>
    </div>
  );
};

export default Home;
