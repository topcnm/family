import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { Form, Row, Col, Icon, Select, Button, Radio, Input, message } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { postJsonData, getData } from '../../../Fetch/fetch';
import Api from '../../../Fetch/api'

const FormItem = Form.Item;
const Option = Select.Option;
const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ align: [] }, 'direction' ],
    [ 'bold', 'italic', 'underline', 'strike' ],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    ['blockquote', 'code-block' ],
    [{ list: 'ordered' }, { list: 'bullet'}, { indent: '-1' }, { indent: '+1' }],
    [ 'link'],
    [ 'clean' ]
  ],
};

class ArticleEdit extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getArticleDetail = this.getArticleDetail.bind(this);
  }
  componentDidMount() {
    const { articleId } = this.props.params;
    if (articleId) {
      this.getArticleDetail(articleId);
    }
  }
  getArticleDetail(articleId) {
    getData(Api.getArticleDetail, {articleId}).then(({success, result, error}) => {
      if (success) {
        this.props.form.setFieldsValue({...result})
      } else {
        message.error(error)
      }
    })
  }
  handleSubmit() {
    const { articleId } = this.props.params;
    this.props.form.validateFields((error, values) => {
      if(error) {
        return null
      }
      if (articleId) {
        postJsonData(Api.updateArticle, {...values, articleId}).then(({success,error,result}) => {
          if (success) {
            message.success('修改成功')
            hashHistory.push('/blog/platform')
          } else {
            message.error(error)
          }
        })
      } else {
        postJsonData(Api.createArticle, values).then(({success,error,result}) => {
          if (success) {
            message.success('新建成功')
            hashHistory.push('/blog/platform')
          } else {
            message.error(error)
          }
        })
      }
    })
  }
  render() {
    const {
      form: { getFieldDecorator },
      } = this.props;

    return (
      <div className="family-blog family-body-content family-body-padding">
        <Form layout="horizontal">
          <Row>
            <Col span={24}>
              <FormItem
                {...formXLItemLayout}
                label="文章标题"
                >
                {getFieldDecorator('title', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请选择申请说明' },
                    { max: 60, message: '最多只能输入60个字符' }
                  ]
                })(
                  <Input placeholder="请输入文章标题" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="文章类别"
                >
                {getFieldDecorator('tagId', {
                  initialValue: 1,
                  rules: [{ required: true, message: '请选择文章类别' }]
                })(
                  <Select placeholder={'文章类别'}>
                    <Option value={1}>通用</Option>
                    <Option value={2}>生活</Option>
                    <Option value={3}>旅游</Option>
                    <Option value={4}>情感</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <FormItem
                {...formItemLayout}
                label="发布状态"
                >
                {getFieldDecorator('publishable', {
                  initialValue: '1',
                  rules: [{ required: true, message: '请选择文章类别' }]
                })(
                  <Select placeholder={'发布状态'}>
                    <Option value="1">公开</Option>
                    <Option value="0">私人</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <FormItem
                {...formXLItemLayout}
                label="文章内容"
                >
                {getFieldDecorator('text', {
                  rules: [{ required: true, message: '请输入文章内容' }]
                })(
                  <ReactQuill modules={modules} placeholder="请输入文章内容" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} offset={2}>
              <FormItem {...formItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={false}
                  onClick={this.handleSubmit}
                  >
                  保存
                </Button>

                <Button
                  style={{marginLeft: 10}}
                  htmlType="button"
                  size="large"
                  loading={false}
                  >
                  返回
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

module.exports = Form.create()(ArticleEdit);

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

