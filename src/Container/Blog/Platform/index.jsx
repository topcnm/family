import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Row, Col, Button, Icon, Input, Table, Breadcrumb,  } from 'antd';

import * as ArticleAction from '../../../Action/article';

import './index.scss';

const Search = Input.Search;

class BlogPlatform extends Component {
  constructor(props) {
    super(props)

    this.handleClickCreateButton = this.handleClickCreateButton.bind(this);
    this.handleSearchPost = this.handleSearchPost.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.articleAction.queryList();
  }
  componentWillUnmount() {

  }
  handleClickCreateButton() {
    hashHistory.push(`/blog/edit`);
  }
  handleSearchPost(value) {
    const queryParam = _.cloneDeep(this.props.article.queryData);
    queryParam.keyword = value;
    queryParam.pageNo = 1;
    this.props.articleAction.overwrite_query_condition(queryParam);
    this.props.articleAction.queryList();
  }
  handlePageChange(pageObj) {
    const queryParam = _.cloneDeep(this.props.article.queryData);
    queryParam.pageNo = pageObj.current;
    this.props.articleAction.overwrite_query_condition(queryParam);
    this.props.articleAction.queryList();
  }
  render() {
    const {
      list,
      total,
      queryData: {
        pageNo,
        pageSize,
        keyword,
        }
      } = this.props.article;
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 550,
        render: (t, {id}, index) => {
          return (<p className="table-row-p"><Link to={`/blog/detail/${id}`}>{t}</Link></p>)
        }
      },
      {
        title: '日期',
        dataIndex: 'publishDate',
        align: 'right',
        width: 180,
      }
    ];
    return (
      <div className="family-blog family-body-content family-body-padding">
        <Row className="family-page-nav">
          <Col span={12}>
            <Breadcrumb>
              <Breadcrumb.Item href="#/">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#/blog/platform">
                <span>文章列表</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            <Button
              type="primary"
              style={{marginRight: 10}}
              onClick={this.handleClickCreateButton}
            >
              写新文章
              <Icon type="edit" />
            </Button>
            <Search
              placeholder="请输入文章名字"
              defaultValue={keyword}
              onSearch={this.handleSearchPost}
              style={{ width: 200 }}
              />
          </Col>
        </Row>
        <div>
          <Row gutter={30}>
            <Col className="gutter-row" span={16}>
              <Table
                showHeader={false}
                columns={columns}
                dataSource={list}
                loading={false}
                rowKey={row => row.id}
                onChange={this.handlePageChange}
                pagination={{
                  current: pageNo,
                  total: total * pageSize,
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
