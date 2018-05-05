import { message } from 'antd';
import * as UserAction from '../Constant/user';
import { postFormData,getData,postUrlData,postJsonData } from '../Fetch/fetch';
import Api from '../Fetch/api';

export function updateLoginUser(data) {
  return {
    type: UserAction.UPDATE_LOGINED_USER,
    data,
  };
}
export function updatePrivateInfo(data) {
  return {
    type: UserAction.UPDATE_PRIVATE_INFO,
    data,
  };
}

export function startLogin(text) {
  return {
    type: UserAction.START_LOGIN,
    data: text,
  };
}

export function endLogin(info) {
  return {
    type: UserAction.END_LOGIN,
    data: info,
  };
}

export function resetRequest() {
  return {
    type: UserAction.RESET_REQUEST,
  };
}

export function updateMenu() {
  return {
    type: UserAction.UPDATE_PRIVATE_MENU,
  };
}

export function clearUserInfo() {
  return {
    type: UserAction.CLEAR_USER_INFO,
  };
}

/**
 * 节流问题，防止反复点击
 * @param state
 * @returns {boolean}
 */
function shouldLogin(state) {
  const { isRequesting, username } = state;
  return !isRequesting && !username;
}

/**
* @usage : 异步请求利用redux-thunk 在action实现 ；
* @remark : 异步请求也可以在page中实现，但是不是最佳实践；
 * redux-thunk ：如何实现回调后的异步操作，比如异步成功后的跳转、刷新、清空
 * 参考 segmentfault：https://segmentfault.com/q/1010000012375617
 *
*/
/*  eslint no-param-reassign: ["error", { "props": false }] */
export function doLogin(user) {
  return (dispatch, getState) => {

    if (!shouldLogin(getState().user)) {
      return null;
    }

    return postJsonData(Api.login, user).then(({ success, result, error }) => {
      if (success) {
        message.success('登录成功!');
        dispatch(endLogin(result));
        dispatch(updateMenu())
      } else {
        message.error(error);
        dispatch(endLogin());
      }
    }).catch((err) => {
      message.error(err);
      dispatch(endLogin());
    });
  };
}

export function doLogout() {
  return dispatch => postJsonData(Api.logout).then(({success, error}) => {
    if (success) {
      message.success('登出成功!');
      dispatch(clearUserInfo());
    } else {
      message.error(error);
    }
  }).catch((err) => {
    message.error(err);
  });
}

