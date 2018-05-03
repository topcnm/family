import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';
import Api from '../../Fetch/api.js';

class UploadDemo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="family-blog family-body-content family-body-padding">
        <Upload name="files" action={Api.uploadFiles}  multiple={true}>
          <Button>
            上传 <Icon tyle="edit" />
          </Button>
        </Upload>
    </div>)
  }
}

module.exports = UploadDemo;