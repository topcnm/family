/**
 * Created by zhongwangsheng on 2017/12/4.
 */
module.exports = {
  getLoginUser() {
    let loginUser = null;
    try {
      loginUser = JSON.parse(localStorage.getItem('LOGIN_USER'));
    } catch (e) {
      loginUser = null;
    }

    return loginUser;
  },
  setLoginUser(loginUser) {
    try {
      return localStorage.setItem('LOGIN_USER', JSON.stringify(loginUser));
    } catch (e) {
      return null;
    }
  },
  removeLoginUser() {
    try {
      return localStorage.removeItem('LOGIN_USER');
    } catch (e) {
      return null;
    }
  },
};
