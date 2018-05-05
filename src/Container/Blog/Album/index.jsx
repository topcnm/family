import React, { Component } from 'react';
import { Avatar, Row, Col, Button, message, Form, Modal, Icon, Input, Select, Radio, Table, Breadcrumb, Card, Checkbox } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Api from '../../../Fetch/api.js';
import { getData, postJsonData } from '../../../Fetch/fetch.js';

import './index.scss';

const { Meta } = Card;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const defaultFront = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png";
const unsortTitle = '未分类相册';
const unsortRemark = '已经上传未被分发到相册的图片...';

/**
 * 如果未传入userid， 那么只能看管理员公开的相册
 * 如果传入userid，那么可以看该人员的公开相册和图片列表，但是只能看
 * 如果传入自己的userid，那么可以看自己的所有相册和图片，而且可以操作图片所属相册
 */

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      albumList: [],

      showAlbum: false,
      showPic: false,
    };

    this.getAlbumList = this.getAlbumList.bind(this);
    this.handleEditAlum = this.handleEditAlum.bind(this);
    this.handleDeleteAlbum = this.handleDeleteAlbum.bind(this);

    this.showAlbum = this.showAlbum.bind(this);
    this.hideAlbum = this.hideAlbum.bind(this);
    this.showPic = this.showPic.bind(this);
    this.hidePic = this.hidePic.bind(this);
  }
  componentDidMount() {
    this.getAlbumList();
  }
  getAlbumList() {
    const {
      userInfo: { id },
      params: { queryId }
      } = this.props;

    getData(Api.getAlbumList, { userId: queryId || id }).then(({success, result}) => {
      if (success) {
        this.setState({
          albumList: result.list
        })
      }
    })
  }
  handleEditAlum(params) {
    const { currentAlbumId } = this.state;
    if (currentAlbumId) {
      params.albumId = currentAlbumId
    }
    postJsonData(Api.createAlbum, params).then(({success}) => {
      if (success) {
        message.success(`${currentAlbumId?'编辑': '新建'}成功`);
        this.hideAlbum();
        this.getAlbumList();
      }
    })
  }
  handleDeleteAlbum(albumId) {
    postJsonData(Api.deleteAlbum, {albumId}).then(({success}) => {
      if (success) {
        message.success('删除成功');
        this.hideAlbum();
        this.getAlbumList();
      }
    })
  }
  showAlbum(currentAlbumId) {
    this.setState({
      showAlbum: true,
      currentAlbumId,
    })
  }
  hideAlbum() {
    this.setState({
      showAlbum: false,
    })
  }
  showPic(currentAlbumId) {
    this.setState({
      showPic: true,
      currentAlbumId,
    })
  }
  hidePic() {
    this.setState({
      showPic: false,
    })
  }
  render() {
    const {
      userInfo: { id },
      params: {
        queryId,
        queryName
        }
      } = this.props;

    const { albumList, showAlbum, showPic } = this.state;

    /**
     * 已经登录未传值 或者 已经登录值一样
     * @type {*|boolean}
     */
    const isAuthor = (id && !queryId) || (id && id == queryId);

    return (
      <div className="family-blog family-body-content family-body-padding">
        <Row className="family-page-nav">
          <Col span={12}>
            <Breadcrumb>
              <Breadcrumb.Item href="#/">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#/blog/platform">
                <span>{queryName || '公开'}的相片列表</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          {
            isAuthor &&
            <Col span={12} style={{textAlign: 'right'}}>
              <Button
                type="primary"
                style={{marginRight: 10}}
                onClick={() => { this.showAlbum() }}
                >
                新建相册
                <Icon type="edit" />
              </Button>
            </Col>
          }
        </Row>
        <Row gutter={24}>
          {
            _.map(albumList, ({id: albumId, front, title, remark}) => {
              return (
                <Col span={6} key={_.uniqueId('ff')}>
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={<div className="family-album-pic" alt={title} style={{backgroundImage: `url(${front || defaultFront})`}} />}
                    actions={
                      isAuthor ?
                      [
                         <Icon type="delete" onClick={() => { this.handleDeleteAlbum(albumId)}} />,
                         <Icon type="setting" onClick={() => { this.showAlbum(albumId) }} />,
                         <Icon type="search" onClick={() => { this.showPic(albumId) }} />,
                      ]:
                      [
                         <Icon type="search" onClick={() => { this.showPic(albumId) }} />,
                      ]
                    }
                  >
                    <Meta
                      className="family-album-meta"
                      title={title}
                      description={remark}
                      />
                  </Card>
                </Col>
              )
            })
          }
          <Col span={6}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={<div className="family-album-pic" alt={'默认'} style={{backgroundImage: `url(${defaultFront})`}} />}
              actions={[
                 <Icon type="search" onClick={() => { this.showPic() }} />,

              ]}
              >
              <Meta
                className="family-album-meta"
                title={unsortTitle}
                description={unsortRemark}
                />
            </Card>
          </Col>
        </Row>

        {
          showAlbum &&
            <AlbumEdit
              albumId={this.state.currentAlbumId}
              onCancel={this.hideAlbum}
              onConfirm={this.handleEditAlum}
            />
        }

        {
          showPic &&
            <PicsModal
              isAuthor={isAuthor}
              userId={queryId || id}
              albumId={this.state.currentAlbumId}
              onOk={this.hidePic}
              onCancel={this.hidePic}
              albumList={albumList}
            />
        }

      </div>
    )
  }
}

/*
* 点击相册，展示所有该相册下的列表
* */
class PicsModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pictureList: [],
      selectedPic: [],
      selectedAlbumId: '',
    }

    this.handleAlbumChange = this.handleAlbumChange.bind(this);
    this.handlePicSelect = this.handlePicSelect.bind(this);
    this.handleMigratePic = this.handleMigratePic.bind(this);
    this.handleSetFront = this.handleSetFront.bind(this);

    this.getPicList = this.getPicList.bind(this);
  }
  componentDidMount() {
    this.getPicList()
  }
  getPicList() {
    const {
      userId,
      albumId,
      } = this.props;

    const queryObj = albumId ?
    { userId, albumId } :
    { userId };

    getData(Api.getPictureList, queryObj).then(({success, result}) => {
      if (success) {
        this.setState({
          pictureList: result.list
        })
      }
    })
  }
  handleAlbumChange(selectedAlbumId) {
    this.setState({
      selectedAlbumId,
    })
  }
  handlePicSelect(isChecked, picId) {
    const _selectedPic = _.cloneDeep(this.state.selectedPic);
    if (isChecked) {
      const __selectedPic = _.without(_selectedPic, picId)
      this.setState({
        selectedPic: __selectedPic
      })
    } else {
      _selectedPic.push(picId);
      this.setState({
        selectedPic: _selectedPic
      })
    }
  }
  handleMigratePic() {
    const { selectedPic, selectedAlbumId } = this.state;
    postJsonData(Api.setPictureBelong,
      { picList: selectedPic.join(), albumId: selectedAlbumId }).
      then(({success, result}) => {
        if (success) {
          this.getPicList();
        }
      })
  }
  handleSetFront(picId) {
    const { albumId } = this.props;
    postJsonData(Api.setFrontPic, { albumId, picId }).then(({success}) => {
      if (success) {
        message.success('设置首页成功')
      }
    })
  }
  render() {
    const { pictureList, selectedPic } = this.state;
    const { albumId } = this.props;
    return (
      <Modal
        width={960}
        closable={false}
        title={
          <Row>
            <Col span={6}>
              图片列表
            </Col>
            {
              this.props.isAuthor &&
              !!pictureList.length &&
              <Col span={18} style={{textAlign: 'right'}}>
                <Select
                  style={{ width: 220 }}
                  value={this.state.selectedAlbumId}
                  onChange={this.handleAlbumChange}
                  placeholder={'请选择相册'}>
                  <Option key={_.uniqueId('dd')} value={''}>请选择相册</Option>
                  {
                    _.map(this.props.albumList, ({id, title})=>{
                      return <Option key={_.uniqueId('dd')} value={id}>{title}</Option>
                    })
                  }
                </Select>
                <Button style={{marginLeft: 15}} onClick={this.handleMigratePic}>
                  迁移图片
                </Button>
            </Col>
            }
          </Row>}
        visible={true}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        >
        <div>
          <Row gutter={24}>
          {
           _.map(pictureList, ({url, id}) => {
             const isChecked = _.indexOf(selectedPic, id) > -1 ;
             return (
               <Col span="6" key={_.uniqueId('ff')}>
                 <Card
                   style={{ width: '100%' }}
                   cover={<img className="family-pic-pic" alt="example" src={url} />}
                   actions={this.props.isAuthor && [
                     albumId && <Icon type="setting" onClick={() =>{ this.handleSetFront(id) }} />,
                     <Checkbox checked={isChecked} onChange={() =>{ this.handlePicSelect(isChecked, id) }}/>
                   ]}
                 >
                   <Meta
                     title={`还没有备注-${id}`}
                     description="This is the description"
                     />
                 </Card>
               </Col>
             )
           })
          }
          </Row>
          <Row>
            {!pictureList.length && '暂无图片'}
          </Row>
        </div>
      </Modal>
    )
  }
}

/*
* 点击相册，展示相册详情
* 点击创建，开启创建相册功能
* */
class AlbumModal extends Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    // 根据参数查询详情
    const { albumId } = this.props;
    if (albumId) {
      getData(Api.getAlbumDetail, {albumId}).then(({success, result}) => {
        if (success) {
          this.props.form.setFieldsValue(result);
        }
      })
    }
  }
  handleSave() {
    this.props.form.validateFields((err, values) =>{
      if (err) {
        return null
      }

      return this.props.onConfirm(values);
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <Modal
        title={'创建相册'}
        visible={true}
        onOk={this.handleSave}
        onCancel={this.props.onCancel}
        >
        <div>
          <Form>
            <FormItem {...formItemLayout} label={'相册标题'}>
              {getFieldDecorator('title', {
                initialValue: '',
                rules: [
                  { required: true, message: '相册标题为必填项目' },
                  { max: 10, message: '相册标题最长10个字' }
                ]
              })(
                <Input placeholder="请输入相册标题" />
              )}

            </FormItem>
            <FormItem {...formItemLayout} label={'相册说明'}>
              {getFieldDecorator('remark', {
                initialValue: '',
                rules: [
                  { required: true, message: '相册说明为必填项目'  },
                  { max: 45, message: '相册说明最长45个字' }
                ]
              })(
                <Input.TextArea placeholder="请输入相册说明" />
              )}

            </FormItem>
            <FormItem {...formItemLayout} label={'是否公开'}>
              {getFieldDecorator('publishAble', {
                initialValue: '1',
                rules: [{ required: true, message: '请选择是否公开' }]
              })(
                <RadioGroup>
                  <Radio value="0">只有自己能看</Radio>
                  <Radio value="1">公开</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

const AlbumEdit = Form.create()(AlbumModal);



const mapStateToProps = (state) => {
  return { userInfo: state.user }
};

const mapActionToProps = (dispatch) => {
  return {}
};

module.exports = connect(mapStateToProps, mapActionToProps)(Album);