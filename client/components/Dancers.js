import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dancers = ({ images, dancers }) => {
  if (dancers.length === 0) {
    return (
      <div className="container">
        <h2>Dancers</h2>
        <Link to='/dancers/create' className="btn btn-outline-primary float-right">Add Dancer</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <Link to='/dancers/create' className="btn btn-outline-primary float-right">Add Dancer</Link>
      <h2>Select Dancer</h2>
      <hr />
      <div>
        { dancers &&
          dancers.map(dancer => {
            const image = images.find(image => dancer.id === image.dancerId);
            return (
              <Link to={`/dancers/${dancer.id}`} key={dancer.id} >
                  <img className="img-thumbnail" width="200px" height="200px" src={image && image.name} />
                  <br />
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ images, dancers }) => {
  return {
    images,
    dancers
  };
};

export default connect(mapStateToProps)(Dancers);
