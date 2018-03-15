/**
 * Created by zhongwangsheng on 2017/12/4.
 */
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { hashHistory } from 'react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import Reducer from '../Reducer/index';

let EnhancerMiddleware = applyMiddleware(thunk);

/* eslint no-underscore-dangle: 0 */
if (process.env.NODE_ENV === 'develop-hot') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  EnhancerMiddleware = composeEnhancers(applyMiddleware(thunk));
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

export default () => {
  let store = createStore(persistedReducer, EnhancerMiddleware);
  let persistor = persistStore(store);
  return { store, persistor }
}
