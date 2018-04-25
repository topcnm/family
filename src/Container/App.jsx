import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as loginAction from '../Action/user';

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
  }

  componentDidMount() {
    window.addEventListener("clearLogin", () => {
      this.props.loginAction.clearUserInfo();
      hashHistory.push('/login')
    })
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

const mapStateToProps = state => ({});

const mapActionToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch)
});

module.exports = connect(mapStateToProps, mapActionToProps)(App);
