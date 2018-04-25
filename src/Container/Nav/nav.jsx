import React, { Component, PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Radio, Menu, Dropdown, Icon, message, Divider } from 'antd';

import * as loginAction from '../../Action/user';

import './nav.scss';

const menuItems = clickConfig => (
  <Menu onClick={clickConfig}>
    <Menu.Item key="0">
      <span rel="noopener noreferrer">
        登出
      </span>
    </Menu.Item>
  </Menu>);

const menuItemsNoLogin = clickConfig => (
  <Menu onClick={clickConfig}>
    <Menu.Item key="1">
      <span rel="noopener noreferrer">
        注册
      </span>
    </Menu.Item>
    <Menu.Item key="2">
      <span rel="noopener noreferrer">
        登录
      </span>
    </Menu.Item>
  </Menu>
);

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.dropDownHandler = this.dropDownHandler.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { user: { username: oldUsername } } = this.props;
    const { user: { username } } = nextProps;

    if (!oldUsername && username) { // 登入
      hashHistory.push('/');
    }
  }
  logOut() {
    this.props.loginAction.doLogout();
  }
  dropDownHandler({ key }) {
    if (key === '0') {
      this.logOut();
    }
  }
  render() {
    const { user: { menu, username } } = this.props;
    return (
      <div className="family-nav clear-fix">
        <div className="family-nav-content">
          {
            username ?
            <div className="family-nav-user">
              <img src="/" alt="" />
              <Dropdown overlay={menuItems(this.dropDownHandler)} placement="bottomRight">
                <span className="ant-dropdown-link nav-user-name">
                  {username} <Icon type="down" />
                </span>
              </Dropdown>
            </div> :
            <div className="family-nav-user">
              <Link to={'/login'}>登录</Link>
              <Divider type="vertical" />
              <Link to={'/register'}>注册</Link>
            </div>
          }
          <div className="family-nav-menu">
            {
              _.map(menu, ({title, url}) => {
                return (
                  <span key={_.uniqueId('_ii')}>
                    <Link to={url}>{title}</Link>
                  </span>
                )
              })
            }
          </div>
        </div>
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
