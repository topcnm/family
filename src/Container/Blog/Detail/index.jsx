import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Icon, Select, Button, Radio, Input, message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { postJsonData, getData } from '../../../Fetch/fetch';
import Api from '../../../Fetch/api'

const FormItem = Form.Item;

class ArticleDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      state: '',
      tagName: '',
      text: ''
    };

    this.getArticleDetail = this.getArticleDetail.bind(this);
  }

  componentDidMount() {
    const { articleId } = this.props.params;
    this.getArticleDetail(articleId);
  }

  getArticleDetail(articleId) {
    getData(Api.getArticleDetail, { postId: articleId }).then(({success, result, error}) => {
      if (success) {
        this.setState({...result})
      } else {
        message.error(error)
      }
    })
  }

  render() {

    return (
      <div className="family-blog family-body-content family-body-padding">
        <Form layout="horizontal">

          <Row>
              <h3 style={{fontSize: 24, textAlign: 'center'}}>{this.state.title}</h3>
          </Row>

          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                >
                <span>{this.state.tagName}</span>
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <FormItem
                {...formXLItemLayout}
                >
                <div className="div-quill ql-editor" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
              </FormItem>
            </Col>
          </Row>

          <Row>

          </Row>
        </Form>
      </div>
    )
  }
}

module.exports = ArticleDetail;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const formXLItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 22 },
  },
};

const formLItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 20 },
  },
};

