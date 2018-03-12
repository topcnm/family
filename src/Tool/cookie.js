/**
 * all cookie instance access the same cookie storage
 * */
function Cookie() {}

/**
 * author:zws
 * @param objName {string} :cookie key
 * @param objValue {string} :cookie value
 * @param objDays {number} : expire day
 * @param objDomain ?
 * */
Cookie.prototype.addCookie = (objName, objValue, objDays, objDomain) => {
  let str = `${objName}=${escape(objValue)};path=/;domain=${objDomain}`;
  if (objDays > 0) {
    const date = new Date();
    const ms = objDays * (3600 * 24 * 1000);
    date.setTime(date.getTime() + ms);
    str += `;expires=${date.toGMTString()}`;
  }
  document.cookie = str;
  return true;
};
/**
 * author:zws
 * @param objName {string} : cookie key
 * */
Cookie.prototype.getCookie = (objName) => {
  const arrStr = document.cookie.split('; ');
  let objVal = '';
  for (let i = 0, l = arrStr.length; i < l; i++) {
    const temArr = arrStr[i].split('=');
    if (temArr[0] === objName) {
      objVal = unescape(temArr[1]);
    }
  }
  return objVal;
};
Cookie.prototype.deleteCookie = (objName, objDomain) => {
  document.cookie = `${objName}=;path=/;domain=${objDomain};expires=${(new Date(0)).toGMTString()}`;
};
module.exports = Cookie;
