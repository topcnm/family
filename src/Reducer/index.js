import { combineReducers } from 'redux';

import user from './user';
import article from './article';


const Reducers = combineReducers({
  user,
  article,
});

export default Reducers;

