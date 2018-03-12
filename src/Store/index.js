/**
 * Created by zhongwangsheng on 2017/12/4.
 */
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';
import { applyMiddleware, createStore, compose } from 'redux';

import Reducer from '../Reducer/index';

let EnhancerMiddleware = applyMiddleware(thunk);

/* eslint no-underscore-dangle: 0 */
if (process.env.NODE_ENV === 'develop-hot') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  EnhancerMiddleware = composeEnhancers(applyMiddleware(thunk));
}

const store = createStore(Reducer, EnhancerMiddleware, autoRehydrate());

persistStore(store, {}, () => {
  const state = store.getState();
  if (!state.user.username) {
    //hashHistory.push('/login');
  }
});
export default store;
