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
        <div className="family-body-content family-body-padding">
          <p className="family-index-sub-title">热门博文</p>
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