import { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

/* eslint no-underscore-dangle: 0 */
/* eslint no-useless-constructor: 0 */
/* eslint-env es6 */
export default class RenderInBody extends Component {
  constructor(p) {
    super(p);
  }
  componentDidMount() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this._renderLayer();
  }
  componentDidUpdate() {
    this._renderLayer();
  }
  componentWillUnmount() {
    ReactDom.unmountComponentAtNode(this.popup);// 在组件卸载的时候，保证弹层也被卸载掉
    document.body.removeChild(this.popup);
  }
  _renderLayer() {
    ReactDom.render(this.props.children, this.popup);// 将弹层渲染到body下的div标签
  }
  render() {
    return null;
  }
}

RenderInBody.propTypes = {
  children: PropTypes.element.isRequired,
};
