import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import * as loginAction from '../../Action/user';
import './Login.scss';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);

    this.checkLoginState = this.checkLoginState.bind(this);
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    this.checkLoginState();
  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUnmount() {
    this.props.loginAction.resetRequest();
  }
  /**
  * @usage : 检测当前人员是否已经登录，如果登录就跳到默认页面
  * @remark : 默认页面将会重新定义
  */
  checkLoginState() {

  }
  login(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.loginAction.doLogin(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ padding: '50px'}}>
        <div className="login">
          <div className="login-header">登录</div>
          <div className="login-body">
            <h4>请输入账号密码</h4>
            <br />
            <Form onSubmit={this.login}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'请输入用户名'} />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入用户密码'}],
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={'请输入用户密码'} />)}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>);
  }
}

Login.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  loginAction: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  form: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch),
});

// 2. Form.create() (Login)，以增加表单域和state，组件来自antd-design
// 3. connect 修饰，以增加redux store传入，组件来自react-redux
module.exports = connect(mapStateToProps, mapActionToProps)(Form.create()(Login));
