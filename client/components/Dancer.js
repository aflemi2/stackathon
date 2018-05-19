import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dancer = ({ dancerImages, dancer }) => {
  if (dancerImages.length === 0) {
    return (
      <div className="container">
        <h2>{dancer && dancer.name}</h2>
        <Link to='/images/create' className="btn btn-outline-primary float-right">Add Images</Link>
      </div>
    );
  }
  return (
    <div className="container">
      <Link to='/images/create' className="btn btn-outline-primary float-right">Add Images</Link>
      <h2>{dancer && dancer.name}</h2>
      <hr />
      <div>
        { dancerImages &&
          dancerImages.map(image => {
            return (
              <div key={image.id} >
                  <img src={image.name} />
                  <br />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ images, dancers }, {id, history}) => {
  const dancer = dancers.find(dancer => dancer.id === id);
  const dancerImages = images.filter(image => image.dancerId === id);
  return {
    dancerImages,
    dancer,
    history
  };
};

export default connect(mapStateToProps)(Dancer);
