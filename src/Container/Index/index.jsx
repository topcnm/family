import React, { Component } from 'react';
import { Row, Col, Card, Carousel } from 'antd';

import './index.scss'
const { Meta } = Card;



class Index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="family-index">
        <div className="family-index-car-main">
          <Carousel autoplay>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
        </div>

        <div className="family-index-banner odd">
          <div className="family-body-content">
            斑斓条
          </div>
        </div>

        <div className="family-body-content">
          <div className="family-index-intro">
          <p>
            上山畈自然村处于璜山镇的东南一侧，这里植被葱郁繁茂，
            空气甜润清新，气候凉爽宜人，享有诸暨桃花源之称。
          </p>
          <div>
          </div>
          </div>
        </div>

        <div className="family-index-banner even">
          <div className="family-body-content">
          斑斓条
          </div>
        </div>

        <div className="family-body-content family-body-padding">
          <p className="family-index-sub-title">热门博客</p>
          <Row gutter={18}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                  />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="family-index-banner odd">
          <div className="family-body-content">
            斑斓条
          </div>
        </div>

        <div className="family-body-content family-body-padding">
          <p className="family-index-sub-title">XXXX</p>
          <Row gutter={18}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                <Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                  />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

module.exports = Index