import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Images = ({ images, dancers }) => {
  if (images.length === 0) {
    return (
      <div className="container">
        <h2>All Images</h2>
        {/* <Link to='/images/create' className="btn btn-outline-primary float-right">Add Images</Link> */}
      </div>
    );
  }
  return (
    <div className="container">
      {/* <Link to='/images/create' className="btn btn-outline-primary float-right">Add Images</Link> */}
      <h2>Dancer Images</h2>
      <hr />
      <ul className="row">
        { images &&
          images.map(image => {
            const dancer = dancers.find(dancer => dancer.id === image.dancerId);
            if (image.name) {
              return (
                <div key={image.id} className="col-sm">
                    <img src={image.name} />
                    <br />
                  {dancer.name}
                </div>
              );
            }
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ images, dancers }) => {

  return {
    images,
    dancers
  };
};

export default connect(mapStateToProps)(Images);
