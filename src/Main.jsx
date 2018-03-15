import 'es6-promise/auto';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { render } from 'react-dom';

import 'normalize.css';
import './Asset/css/style.scss';
import './Asset/Iconfont/iconfont.css';

import RouterMap from './Router/index';
import Store from './Store/index';

const {store, persistor} = Store();

render((<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <RouterMap />
  </PersistGate>
</Provider>), document.getElementById('root'));
