import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Home from './Home';
import Images from './Images';
import Dancers from './Dancers';
import Dancer from './Dancer';

import { loadDancers } from '../redux/dancers';
import { loadImages } from '../redux/images';

class Main extends Component {
  componentDidMount() {
    this.props.loadDancers();
    this.props.loadImages();
  }

  render() {

    return (
      <Router>
        <div>
          <Nav />
          <Route path='/' exact component={Home} />
          <Route path='/images' exact component={Images} />
          <Route path='/dancers' exact component={Dancers} />
          <Route path='/dancers/:id' exact render={({match, history})=> <Dancer id={ match.params.id * 1} history={ history } /> } />
        </div>
      </Router>
    );
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    loadDancers: () => dispatch(loadDancers()),
    loadImages: () => dispatch(loadImages())
  };
};

export default connect(null, mapDispacthToProps)(Main);
