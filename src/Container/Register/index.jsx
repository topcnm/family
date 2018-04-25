import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Form, Row, Col, Button, Icon, Table, Input, message  } from 'antd';
import { postJsonData } from '../../Fetch/fetch';
import Api from '../../Fetch/api';

const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {

  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (error) {
        return null
      }

      postJsonData(Api.register, values).then(({success}) => {
        if (success) {
          message.success('注册成功');
        }
      })
    })

  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (<div className="family-blog family-body-content family-body-padding">
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={'用户名'}>
          {
            getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'请输入用户名'} />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'密码'}>
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入用户密码' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'请输入用户名'} />)
          }
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={false}
            >
            保存
          </Button>
        </FormItem>
      </Form>

    </div>)
  }
}

module.exports = Form.create()(Register);