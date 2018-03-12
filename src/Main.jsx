import 'es6-promise/auto';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import './Asset/css/style.scss';
import './Asset/Iconfont/iconfont.css';

import RouterMap from './Router/index';
import store from './Store/index';

render(<Provider store={store}><RouterMap /></Provider>, document.getElementById('root'));
