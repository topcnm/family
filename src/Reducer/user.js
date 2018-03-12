import * as userAction from '../Constant/user';

/**
* @usage : 存储用户信息
* @return :
* @remark :
*/
const initState = {
  ifRequesting: false,
  username: '',
  password: '',
  langIndex: 0,
};

export default function user(state = initState, action) {
  switch (action.type) {
    case userAction.UPDATE_LOGINED_USER:
      return action.data;

    case userAction.START_LOGIN:
      return Object.assign({}, state, { isRequesting: true });

    case userAction.END_LOGIN:
      return Object.assign({}, state, { isRequesting: false }, action.data);

    case userAction.RESET_REQUEST:
      return Object.assign({}, state, { isRequesting: false });

    case userAction.UPDATE_PRIVATE_LANG:
      return Object.assign({}, state, { langIndex: action.data });

    case userAction.CLEAR_USER_INFO:
      return Object.assign({}, initState);

    default:
      return state;
  }
}
