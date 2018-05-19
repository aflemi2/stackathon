import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ dancers, images })=> {
  if(!images){
    return null;
  }
  if(!dancers){
    return null;
  }

  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark mb-4 row justify-content-between" >
      <div >
        <NavLink className="btn btn-dark btn-outline-light" to='/'>
          Home
        </NavLink>
      </div>
      <div>
        <NavLink className="btn btn-dark btn-outline-light" to='/dancers'>
          Dancers ({ dancers.length })
        </NavLink>
      </div>
      <div>
        <NavLink className="btn btn-dark btn-outline-light" to='/images'>
         Images ({ images.length })
        </NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = ({ images, dancers })=> {
  return {
    images,
    dancers
  };
};

export default connect(mapStateToProps)(Nav);
