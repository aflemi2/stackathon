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
      <div className="nav-item col-4">
        <NavLink className="nav-link" to='/'>
          Home
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" to='/dancers'>
          Dancers ({ dancers.length })
        </NavLink>
      </div>
      <div className="nav-item">
      <NavLink className="nav-link" to='/images'>
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
