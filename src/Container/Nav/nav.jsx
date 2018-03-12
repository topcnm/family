import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Radio, Menu, Dropdown, Icon, message } from 'antd';
import { FormattedMessage } from 'react-intl';

import MainMenu from './component/MainMenu';

import * as loginAction from '../../Action/user';

import './nav.scss';

const menuItems = clickConfig => (
  <Menu onClick={clickConfig}>
    <Menu.Item key="0">
      <span rel="noopener noreferrer">
        <FormattedMessage id="nav.logout" />
      </span>
    </Menu.Item>
  </Menu>);

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.dropDownHandler = this.dropDownHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {

  }
  logOut() {

  }
  dropDownHandler({ key }) {
    if (key === '0') {
      this.logOut();
    }
  }
  render() {
    const { user: { menu, username } } = this.props;
    return (
      <div className="nav clear-fix">
        <div className="nav-user">
          <img src="/" alt="" />
          <Dropdown overlay={menuItems(this.dropDownHandler)} placement="bottomRight">
            <span className="ant-dropdown-link nav-user-name">
              {username} <Icon type="down" />
            </span>
          </Dropdown>
        </div>
        <MainMenu data={menu} />
      </div>);
  }
}

Nav.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  loginAction: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
});

module.exports = connect(mapStateToProps, mapActionToProps)(Nav);
