import React, { Component } from 'react';

import './index.scss';

class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="family-footer clear-fix">
        <div className="family-footer-content">
          文字1
          <hr />
          文字二
        </div>
      </div>
    )
  }
}

module.exports = Footer;
