import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Home from './Home';
// import Students from './Students';
// import Campuses from './Campuses';

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
          {/* <Route path='/students' exact component={Dancers} />
          <Route path='/campuses' exact component={Images} />  */}
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
