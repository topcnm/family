import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './index.scss';

class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { user: { menu } } = this.props;
    return (
      <div className="family-footer clear-fix">
        <div className="family-footer-content">
          <div className="family-footer-menu">
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
          <hr />
          <div>
            <span>四川省成都市武侯区中和街道78号几栋几零几</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionToProps = dispatch => ({});

module.exports = connect(mapStateToProps, mapActionToProps)(Footer);
