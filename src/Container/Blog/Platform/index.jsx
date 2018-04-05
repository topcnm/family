import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './index.scss';

class BlogPlatform extends Component {
  render() {
    return (
      <div className="family-blog family-body-content family-body-padding">
        <div>路径展示</div>
        <div>
          <Row gutter={30}>
            <Col className="gutter-row" span={16}>
              <div>列表内容</div>
              <div>翻页器</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <Row>模块一</Row>
              <Row>模块一</Row>
              <Row>模块一</Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

module.exports = BlogPlatform;
