import React, { Component } from 'react';
import RenderInBody from '../../../Component'

import './index.scss';

class CostQuery extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div className='test-page'>
      <TestRef />
    </div>)
  }
}

// 验证 HOC

class TestRef extends Component {
  constructor(props) {
    super(props)

    this.callInner = this.callInner.bind(this)
  }
  callInner() {
    this.inner.showMyName()
  }
  render() {
    return <div>
      <button onClick={this.callInner}>Show myname</button>
      <Inner ref={(cmp) => this.inner = cmp } />
    </div>
  }
}


class Inner extends Component {
  showMyName() {
    console.log('Inner inner')
  }
  render() {
    return (<p>This is inner Component</p>)
  }
}




module.exports = CostQuery;