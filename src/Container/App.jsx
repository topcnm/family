import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Nav from './Nav/nav';
import Footer from './Footer';

/**
* @usage : 组件外层
* @return :
* @remark :
*/
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
        <div className="page-layout">
          <Nav />
          <div className="content">
            {this.props.children }
          </div>
          <Footer />
        </div>
      );
  }
}

App.propTypes = {

};

module.exports = App;
