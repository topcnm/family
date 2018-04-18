import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Row, Col, Button, Icon, Table,  } from 'antd';

import * as ArticleAction from '../../../Action/article';

import './index.scss';

class BlogPlatform extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    this.props.articleAction.queryList()
  }
  render() {
    const {
      list,
      total,
      queryData: {
        pageNo,
        pageSize
        }
      } = this.props.article;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (t, {id}, index) => {
          return (<Link to={`/blog/detail/${id}`}>{t}</Link>)
        }
      },
      {
        title: '分类',
        dataIndex: 'tagName',
        key: 'tagName'
      },
      {
        title: '作者',
        dataIndex: 'authorName'
      }
    ]
    return (
      <div className="family-blog family-body-content family-body-padding">
        <div>
          <Button>
            <Link to={`/blog/edit`}>写新文章</Link>
            <Icon type="edit" />
          </Button>
        </div>
        <div>

          <Row gutter={30}>
            <Col className="gutter-row" span={16}>
              <Table
                showHeader={false}
                columns={columns}
                dataSource={list}
                loading={false}
                rowKey={row => row.id}
                onChange={()=>{}}
                pagination={{
                  current: pageNo,
                  total: total,
                }}
                />
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

const mapStateToProps = (state) => {
  return {
    article: state.article
  }
};

const mapActionToProps = (dispatch) => {
  return {
    articleAction: bindActionCreators(ArticleAction, dispatch)
  }
};

module.exports = connect(mapStateToProps, mapActionToProps)(BlogPlatform);
