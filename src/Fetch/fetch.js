import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

const TIMEOUTLIMIT = 10000;

const embedFetch = (requestPromise, timeout = TIMEOUTLIMIT) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject(new Error('请求超时'));
    };
  });
  setTimeout(() => {
    timeoutAction();
  }, timeout);
  return Promise.race([requestPromise, timerPromise]);
};

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  if (response.status === 401) {// 401表示已经过期, 则清空所有
    hashHistory.push('/login');
    console.warn('擦除所有本地信息');
  }
  return Promise.reject(new Error(response.statusText));
}

function json(response) {
  return response.json();
}

export function getData(url, queryObj) {
  const reqHeader = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };
  const myFetch = fetch(`${url}?${queryString.stringify(queryObj)}`, reqHeader);
  return new Promise((resolve, reject) => {
    embedFetch(myFetch, TIMEOUTLIMIT)
      .then(status)
      .then(json)
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.warn('服务器连接错误，请稍后再试');
        reject(error);
      });
  });
}

export function postJsonData(url, queryObj) {
  const reqJson = {
    method: 'POST',
    body: JSON.stringify(queryObj),
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };
  const myFetch = fetch(url, reqJson);

  return new Promise((resolve, reject) => {
    embedFetch(myFetch, TIMEOUTLIMIT)
      .then(status)
      .then(json)
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.warn('服务器连接错误，请稍后再试');
        reject(error);
      });
  });
}

export function postFormData(url, queryObj) {
  const reqJson = {
    method: 'POST',
    mode: 'cors',
    body: queryString.stringify(queryObj),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const myFetch = fetch( url, reqJson);
  return new Promise((resolve, reject) => {
    embedFetch(myFetch, TIMEOUTLIMIT)
      .then(status)
      .then(json)
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.warn('服务器连接错误，请稍后再试');
        reject(error);
      });
  });
}

export function postUrlData(url, queryObj) {
  const reqJson = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
  };
  const myFetch = fetch( `${url}?${queryString.stringify(queryObj)}`, reqJson);
  return new Promise((resolve, reject) => {
    embedFetch(myFetch, TIMEOUTLIMIT)
      .then(status)
      .then(json)
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        console.warn('服务器连接错误，请稍后再试');
        reject(error);
      });
  });
}
