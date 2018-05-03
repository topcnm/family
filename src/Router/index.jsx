import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import React from 'react';
import _ from 'lodash';
import App from '../Container/App';

//首页
import Home from '../Container/Index';

//登录页面
import Login from '../Container/Login/Login';
import Register from '../Container/Register'


// --- cost ----
//import CostQuery from '../Container/QueryPlatform/CostQuery';


// --- blog ----
import BlogPlatform from '../Container/Blog/Platform';
import ArticleEdit from '../Container/Blog/Edit';
import ArticleDetail from '../Container/Blog/Detail';

import UploadTest from '../Container/TestUpload';

const onEnterCall = (nextState, replaceState) => {
  //判断登录
};

/**
* @usage : 根据登录情况，编写不同的模板
* @remark : 登录页面和不登录页面布局不一样
*/
const myRouter = () =>
  (
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onEnterCall}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/blog/platform" component={BlogPlatform} />
        <Route path="/blog/edit(/:articleId)" component={ArticleEdit} />
        <Route path="/blog/detail/:articleId" component={ArticleDetail} />

        <Route path="/upload" component={UploadTest} />
      </Route>
    </Router>);

export default myRouter;
